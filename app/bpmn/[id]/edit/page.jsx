/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from 'react'
import '../bpmn.css'
// import css from node module
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import '@bpmn-io/properties-panel/assets/properties-panel.css'

import { useEffect, useRef, useState } from 'react'
import slugify from 'slugify'
import TomModeler from '../modeler'
import gridModule from 'diagram-js-grid'
import {
	useUpdateProjectMutation,
	useGetProjectBpmnQuery,
} from '../../../lib/redux/slices/projectSlice'

import diagramXML from '../resources/newDiagram.js'
import { BpmnPropertiesPanelModule } from 'bpmn-js-properties-panel'

import taskProviderModule from '../properties-provider/task-properties-provider'
import laneProviderModule from '../properties-provider/lane-properties-provider'
import eventHandlerModules from '../eventHandlers'
import tomExtension from '../properties-provider/moodleExtensions/tom.json'

const BpmnEditorPage = ({ params }) => {
	const container = useRef()
	const canvas = useRef()
	const properties = useRef()
	const bpmnInstance = useRef()
	//const router = useRouter()
	const { data, isLoading, isError } = useGetProjectBpmnQuery(params.id)
	const [updateProject] = useUpdateProjectMutation()
	const project = data || {}
	const generateName = (prefix) => {
		return `${slugify(project.name)}.${prefix}`
	}

	useEffect(() => {
		if (!window) return
		if (isLoading) return
		if (isError) return
		if (!container.current) return
		if (!canvas.current) return
		if (!properties.current) return

		bpmnInstance.current = new TomModeler({
			container: canvas.current,
			keyboard: {
				bindTo: document,
			},
			propertiesPanel: {
				parent: properties.current,
			},
			additionalModules: [
				BpmnPropertiesPanelModule,
				gridModule,
				laneProviderModule,
				taskProviderModule,
				eventHandlerModules,
			],
			moddleExtensions: {
				tom: tomExtension,
			},
		})

		async function openDiagram(xml) {
			if (!window) return
			if (!container?.current) return
			if (!canvas?.current) return
			if (!properties?.current) return
			if (!bpmnInstance?.current) return
			try {
				await bpmnInstance.current.importXML(xml)
			} catch (err) {
				if (
					err &&
					err.message !==
						`Cannot read properties of undefined (reading 'root-0')`
				) {
					console.error('something went wrong:', err)
				}
			}
		}
		if (project?.bpmnFile) {
			console.log('opening bpmn file')
			openDiagram(project.bpmnFile)
		} else {
			console.log('opening new diagram')
			openDiagram(diagramXML)
		}

		return () => bpmnInstance.current?.destroy()
	}, [isLoading, isError])

	// auto save
	useEffect(() => {
		if (!window) return
		if (isLoading) return
		if (isError) return
		if (!container?.current) return
		if (!canvas?.current) return
		if (!properties?.current) return
		const autoSave = async () => {
			const { xml } = await bpmnInstance.current.saveXML({ format: true })
			const { svg } = await bpmnInstance.current.saveSVG()
			const xmlBlob = new Blob([xml], { type: 'text/xml' })
			const svgBlob = new Blob([svg], { type: 'image/svg+xml' })
			const bpmnFile = await fetch(`/api/blob/${generateName('bpmn')}`, {
				method: 'POST',
				body: xmlBlob,
			})
				.then((res) => res.json())
				.then((res) => res.url)
				.catch((err) => console.error(err))
			const thumbnail = await fetch(`/api/blob/${generateName('svg')}`, {
				method: 'POST',
				body: svgBlob,
			})
				.then((res) => res.json())
				.then((res) => res.url)
				.catch((err) => console.error(err))
			await updateProject({
				id: project.id,
				bpmnFile,
				thumbnail,
			})
		}
		if (window) {
			window.addEventListener('click', autoSave)
		}
		return async () => {
			window.removeEventListener('click', autoSave)
		}
	}, [isLoading, isError])

	return (
		<div className="content pt-15 absolute" ref={container}>
			{isLoading && (
				<div className={`hero min-h-screen bg-base-200`}>
					<div className="hero-content text-center">
						<div className="max-w-md">
							<span className="loading loading-infinity w-80 text-primary"></span>
						</div>
					</div>
				</div>
			)}
			<div
				className={`canvas bg-white ${isLoading && 'hidden'}`}
				ref={canvas}
			></div>
			<div className="property_panel inactive relative" ref={properties}></div>
		</div>
	)
}

export default BpmnEditorPage
