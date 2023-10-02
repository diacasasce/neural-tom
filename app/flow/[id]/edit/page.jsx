/* eslint-disable react/display-name */
'use client'
import React, { useState, useRef, useCallback } from 'react'
import ReactFlow, {
	MiniMap,
	Controls,
	ControlButton,
	Background,
	useReactFlow,
	ReactFlowProvider,
} from 'reactflow'

import 'reactflow/dist/style.css'
import { nodeTypes } from './components/nodes'
import {
	edgeTypes,
	ConnectionLine,
	ConnectionLineStyle,
	EdgeOptions,
} from './components/edges'
import useStore from './components/nodes/store'
import StartIcon from './components/icons/start.svg'
import TaskIcon from './components/icons/task.svg'
import EndIcon from './components/icons/end.svg'
import LaneIcon from './components/icons/lane.svg'

const FlowEditorPage = ({ params }) => {
	const { id } = params
	let nId = 0
	const getNewNode = (type, position) => {
		const id = getNodeId()
		return {
			id,
			type,
			position,
			data: { label: `${type} node`, id },
		}
	}
	const getNodeId = () => `node_${++nId}`
	const { getIntersectingNodes } = useReactFlow()
	const {
		isModalOpen,
		closeModal,
		modalComponent,
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		onConnect,
		addNode,
		updateNode,
		updateEdge,
		removeEdge,
	} = useStore()

	const reactFlowWrapper = useRef(null)
	const edgeUpdateSuccessful = useRef(true)
	const [reactFlowInstance, setReactFlowInstance] = useState(null)

	const onButtonDragStart = (event, nodeType) => {
		event.dataTransfer.setData('application/reactflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
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

			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			})
			const newNode = getNewNode(type, position)
			console.log({ newNode })
			addNode(newNode)
		},
		[reactFlowInstance]
	)

	const onDragOver = useCallback((event) => {
		event.preventDefault()
		event.dataTransfer.dropEffect = 'move'
	}, [])

	const onNodeDragStop = useCallback((event, node) => {
		const { type, data, parentNode } = node
		if (type === 'lane') return
		const intersection = getIntersectingNodes(node).filter(
			(n) => n.type === 'lane'
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
		updateEdge(oldEdge, newConnection)
	}, [])

	const onEdgeUpdateEnd = useCallback((_, edge) => {
		if (!edgeUpdateSuccessful.current) {
			removeEdge(edge.id)
		}

		edgeUpdateSuccessful.current = true
	}, [])

	const onPaneClick = (event) => console.log('onPaneClick', event)
	return (
		<main className="h-screen">
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
							onInit={setReactFlowInstance}
							onDrop={onDrop}
							onDragOver={onDragOver}
							onNodeDragStop={onNodeDragStop}
							onEdgeUpdate={onEdgeUpdate}
							onEdgeUpdateStart={onEdgeUpdateStart}
							onEdgeUpdateEnd={onEdgeUpdateEnd}
							onPaneClick={onPaneClick}
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
							</Controls>
							<MiniMap className="hidden" />
							<Background variant="dots" gap={12} size={1} />
						</ReactFlow>
					</div>
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
