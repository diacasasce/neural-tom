/* eslint-disable react/display-name */
'use client'
import React, {
	useState,
	useRef,
	useCallback,
	Suspense,
	useEffect,
} from 'react'
import ReactFlow, {
	MiniMap,
	Controls,
	ControlButton,
	Background,
	useReactFlow,
	ReactFlowProvider,
	getRectOfNodes,
	getTransformForBounds,
} from 'reactflow'

import ShortUniqueId from 'short-unique-id'
import { toPng } from 'html-to-image'
import b64toBlob from 'b64-to-blob'

import 'reactflow/dist/style.css'

import { nodeTypes } from './components/nodes'
import {
	edgeTypes,
	ConnectionLine,
	ConnectionLineStyle,
	EdgeOptions,
} from './components/edges'
import useStore from './components/store'
import StartIcon from './components/icons/start.svg'
import TaskIcon from './components/icons/task.svg'
import EndIcon from './components/icons/end.svg'
import LaneIcon from './components/icons/lane.svg'
import SaveIcon from './components/icons/save.svg'
import {
	CheckIcon,
	CloudArrowUpIcon,
	ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import {
	useUpdateProjectMutation,
	useGetProjectQuery,
} from '../../../lib/redux/slices/projectSlice'
import Loading from './components/loading'
import slugify from 'slugify'
import { set } from 'min-dash'

//import { elementToSVG } from 'dom-to-svg'

const FlowEditorPage = ({ params }) => {
	const uid = new ShortUniqueId({ length: 6 })
	const { id } = params
	const [startingDeploy, setStartingDeploy] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [deployStatus, setDeployStatus] = useState('')

	// create a use effect that runs on start and adds a time out that is removed when component is destroyed
	const {
		isModalOpen,
		closeModal,
		modalComponent,
		nodes,
		getNode,
		setNodes,
		edges,
		setEdges,
		rfInstance,
		onNodesChange,
		onEdgesChange,
		addEdge,
		setRfInstance,
		addNode,
		updateNode,
		updateEdge,
		removeEdge,
	} = useStore()
	const {
		data: project,
		isLoading: isGetProjectLoading,
		isError: isGetProjectError,
	} = useGetProjectQuery(id)

	const [updateProject] = useUpdateProjectMutation()

	const { getIntersectingNodes, getNodes } = useReactFlow()

	const getNewNode = (type, position) => {
		const id = getNodeId()
		return {
			id,
			type,
			position,
			data: { label: `${type} node`, id },
			zIndex: type === 'lane' ? -1 : 0,
		}
	}
	const getNodeId = () => `node_${uid.rnd()}`
	const reactFlowWrapper = useRef(null)
	const edgeUpdateSuccessful = useRef(true)

	useEffect(() => {
		if (!project) return
		const { jsonFile } = project
		if (!jsonFile) return
		setNodes(jsonFile.nodes)
		setEdges(jsonFile.edges)
	}, [project, setNodes, setEdges])

	const addNextTask = (source, target) => {
		const sourceNode = nodes.find((node) => node.id === source)
		const { data } = sourceNode
		const { nextTasks } = data
		const nextTask = {
			name: `rule ${target}`,
			next: target,
		}
		updateNode({
			...sourceNode,
			data: {
				...data,
				nextTasks: [...(nextTasks || []), nextTask],
			},
		})
	}

	const removeNextTask = (source, target) => {
		const sourceNode = getNode(source)
		const { data } = sourceNode
		const nextTasks = (data.nextTasks || []).filter(
			(task) => task.next !== target
		)
		updateNode({
			...sourceNode,
			data: {
				...data,
				nextTasks,
			},
		})
	}

	const onButtonDragStart = (event, nodeType) => {
		event.dataTransfer.setData('application/reactflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
	}

	const onConnect = (connection) => {
		const { source, target } = connection
		addNextTask(source, target)
		// check if edge alredy exists
		const edge = edges.find(
			(edge) => edge.source === source && edge.target === target
		)
		if (edge) return
		addEdge(connection)
	}
	const onDrop = useCallback(
		(event) => {
			event.preventDefault()
			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
			const type = event.dataTransfer.getData('application/reactflow')
			// check if the dropped element is valid
			if (typeof type === 'undefined' || !type) {
				return
			}

			const position = rfInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			})
			const newNode = getNewNode(type, position)
			addNode(newNode)
		},
		[rfInstance]
	)

	const onDragOver = useCallback((event) => {
		event.preventDefault()
		event.dataTransfer.dropEffect = 'move'
	}, [])

	const onNodeDragStop = useCallback((event, node) => {
		if (!node) return
		const { type, data, parentNode } = node
		if (type === 'lane') return
		const intersection = getIntersectingNodes(node).filter(
			(n) => n?.type === 'lane'
		)[0]

		if (intersection?.id == parentNode) return
		const movedNode = {
			id: node.id,
			position: {
				x:
					node.positionAbsolute.x -
					(intersection ? intersection.position.x : 0),
				y:
					node.positionAbsolute.y -
					(intersection ? intersection.position.y : 0),
			},
			parentNode: intersection?.id,
		}
		updateNode(movedNode)
	}, [])

	const onEdgeUpdateStart = useCallback(() => {
		edgeUpdateSuccessful.current = false
	}, [])

	const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
		edgeUpdateSuccessful.current = true
		const edge = edges.find(
			(edge) =>
				edge.source === newConnection.source &&
				edge.target === newConnection.target
		)
		if (edge) return
		removeNextTask(oldEdge.source, oldEdge.target)
		addNextTask(newConnection.source, newConnection.target)
		updateEdge(oldEdge, newConnection)
	}, [])

	const onEdgeUpdateEnd = useCallback((_, edge) => {
		if (!edgeUpdateSuccessful.current) {
			removeNextTask(edge.source, edge.target)
			removeEdge(edge.id)
		}

		edgeUpdateSuccessful.current = true
	}, [])

	const onNodeDoubleClick = useCallback((event, node) => {
		console.log({ node })
	}, [])

	const onSave = useCallback(async () => {
		if (rfInstance) {
			const obj = rfInstance.toObject()
			const { id } = project
			const bytes = new TextEncoder().encode(JSON.stringify(obj))
			const JSONBlob = new Blob([bytes], {
				type: 'application/json;charset=utf-8',
			})
			return fetch(`/api/blob/${id}.json`, {
				method: 'POST',
				body: JSONBlob,
			})
				.then((res) => res.json())
				.then((res) => res.url)
				.then((jsonFile) => {
					updateProject({
						id,
						jsonFile,
					})
				})
		}
	}, [rfInstance, project, updateProject])

	const onGenerateImage = useCallback(() => {
		const imageWidth = 1024
		const imageHeight = 768
		const nodeBounds = getRectOfNodes(nodes)
		const { width, height } = nodeBounds
		const transform = getTransformForBounds(
			nodeBounds,
			imageWidth,
			imageHeight,
			0.5,
			2
		)
		toPng(document.querySelector('.react-flow__viewport'), {
			backgroundColor: '#f9fafb',
			width: imageWidth,
			height: imageHeight,
			style: {
				width: imageWidth,
				height: imageHeight,
				transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
			},
		}).then((b64) => {
			const [datatype, datab64] = b64.split(';')
			const data = datab64.split(',')[1]
			const type = datatype.split(':')[1]
			console.log({
				type,
				data,
				b64,
			})
			const img = b64toBlob(data, type)
			return fetch(`/api/blob/${id}.png`, {
				method: 'POST',
				body: img,
			})
				.then((res) => res.json())
				.then((res) => res.url)
				.then((thumbnail) => {
					updateProject({
						id,
						thumbnail,
					})
				})
		})
	}, [id, nodes, updateProject])

	const onDeploy = useCallback(async () => {
		const formattedJSON = {
			name: 'process',
			attributes: {},
			value: '',
			children: nodes
				.filter((node) => node.type === 'lane')
				.map((lane) => {
					const { id, data } = lane
					return {
						name: 'lane',
						attributes: {
							id,
							name: data.name,
							canCreate: data.canWrite,
							canRead: data.canRead,
							canUpdate: data.canUpdate,
							canDelete: data.canDelete,
						},
						children: nodes
							.filter((node) => node.parentNode === id)
							.map((node) => {
								const { id, type, data } = node
								if (type !== 'task') {
									return {
										name: type,
										attributes: {
											id,
											name: data.name,
										},
									}
								}
								return {
									name: type,
									attributes: {
										id,
										name: slugify(data.name),
										type: data.taskType,
									},
									children: [
										{
											name: 'task_description',
											value: data.description,
										},
										{
											name: 'task_front',
											value: data.frontendDescription,
										},
										{
											name: 'task_input',
											value: data.taskInput,
										},
										{
											name: 'task_output',
											value: data.taskOutput,
										},
										{
											name: 'next_task',
											children: data.nextTasks.map((nextTask) => {
												const Nnode = nodes.find(
													(node) => node.id === nextTask.next
												)
												return {
													name: 'rule',
													attributes: {
														name: nextTask.name,
													},
													children: [
														{
															name: 'next',
															value: slugify(Nnode.data?.name || Nnode.type),
														},
													],
												}
											}),
										},
									],
								}
							}),
					}
				}),
		}
		console.log({ formattedJSON })
		await fetch('/api/projects/deploy', {
			method: 'POST',
			body: JSON.stringify(formattedJSON),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.catch((err) => {
				console.error(err)
				setStartingDeploy(false)
			})

		setStartingDeploy(false)
	}, [onSave, onGenerateImage, nodes])

	const onNodesDelete = useCallback(
		(deletedNodes) => {
			// is is lane remove as parent
			for (const dn of deletedNodes) {
				if (dn.type === 'lane') {
					const children = nodes.filter((n) => n.parentNode === dn.id)
					for (const child of children) {
						updateNode({
							...child,
							parentNode: null,
							position: {
								x: child.positionAbsolute.x,
								y: child.positionAbsolute.y,
							},
						})
					}
				}
			}
		},
		[nodes, updateNode]
	)

	const GetSatusIcon = ({ status }) => {
		switch (status) {
			case 'success':
				return <CheckIcon />
			case 'error':
				return <ExclamationCircleIcon />
			default:
				return (
					<span className="loading loading-infinity loading-sm text-white"></span>
				)
		}
	}

	return (
		<main className="h-screen bg-primary-content">
			{isGetProjectLoading && <Loading />}
			<div className="drawer drawer-end h-full">
				<input
					id="my-drawer-4"
					type="checkbox"
					className="drawer-toggle"
					checked={isModalOpen}
					onChange={(event) => {
						if (!event.target.checked) {
							closeModal()
						}
					}}
				/>
				<div className="drawer-content h-full">
					<div
						className=" h-full reactflow-wrapper pt-20"
						ref={reactFlowWrapper}
					>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							nodeTypes={nodeTypes}
							edgeTypes={edgeTypes}
							onConnect={onConnect}
							onInit={setRfInstance}
							onDrop={onDrop}
							onDragOver={onDragOver}
							onNodeDragStop={onNodeDragStop}
							onNodeDoubleClick={onNodeDoubleClick}
							onNodesDelete={onNodesDelete}
							onEdgeUpdate={onEdgeUpdate}
							onEdgeUpdateStart={onEdgeUpdateStart}
							onEdgeUpdateEnd={onEdgeUpdateEnd}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							connectionLineStyle={ConnectionLineStyle}
							connectionLineComponent={ConnectionLine}
							defaultEdgeOptions={EdgeOptions}
							fitView
						>
							<Controls position="top-left">
								<ControlButton className="cursor-grab active:cursor-grabbing">
									<div
										onDragStart={(event) => onButtonDragStart(event, 'start')}
										draggable
									>
										<StartIcon />
									</div>
								</ControlButton>
								<ControlButton>
									<div
										onDragStart={(event) => onButtonDragStart(event, 'task')}
										draggable
									>
										<TaskIcon />
									</div>
								</ControlButton>
								<ControlButton>
									<div
										onDragStart={(event) => onButtonDragStart(event, 'end')}
										draggable
									>
										<EndIcon />
									</div>
								</ControlButton>
								<ControlButton>
									<div
										onDragStart={(event) => onButtonDragStart(event, 'lane')}
										draggable
									>
										<LaneIcon />
									</div>
								</ControlButton>
								<ControlButton
									onClick={async () => {
										setStartingDeploy(true)
										await onSave()
										await onGenerateImage()
										await onDeploy()
										setStartingDeploy(false)
									}}
									disabled={startingDeploy}
								>
									{startingDeploy ? (
										<span className="loading loading-infinity loading-md "></span>
									) : (
										<CloudArrowUpIcon />
									)}
								</ControlButton>
								<ControlButton
									className="w-10"
									onClick={async () => {
										setIsSaving(true)
										await onSave()
										await onGenerateImage()
										setIsSaving(false)
									}}
								>
									{isSaving ? (
										<span className="loading loading-infinity loading-md "></span>
									) : (
										<SaveIcon />
									)}
								</ControlButton>
							</Controls>
							<MiniMap className="hidden" />
							<Background variant="dots" gap={12} size={1} />
						</ReactFlow>
					</div>
					{startingDeploy && (
						<div className="toast toast-end">
							<div className={`alert  alert-info`}>
								<GetSatusIcon status={deployStatus} />
							</div>
						</div>
					)}
				</div>
				<div className="drawer-side pt-10">
					<label
						htmlFor="my-drawer-4"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>

					{modalComponent}
				</div>
			</div>
		</main>
	)
}

export default (props) => {
	return (
		<ReactFlowProvider>
			<FlowEditorPage {...props} />
		</ReactFlowProvider>
	)
}
