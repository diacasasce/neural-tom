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
import TomModeler from '../modeler'
import gridModule from 'diagram-js-grid'
import { useGetProjectQuery } from '../../../lib/redux/slices/projectSlice'

import diagramXML from '../resources/newDiagram.js' // use raw to load as String in VITE
import { BpmnPropertiesPanelModule } from 'bpmn-js-properties-panel'

import taskProviderModule from '../properties-provider/task-properties-provider'
import laneProviderModule from '../properties-provider/lane-properties-provider'
import eventHandlerModules from '../eventHandlers'
import tomExtension from '../properties-provider/moodleExtensions/tom.json'
import svg64 from 'svg64'

const BpmnEditorPage = ({ params }) => {
	const container = useRef()
	const canvas = useRef()
	const properties = useRef()
	const bpmnInstance = useRef()
	const [SVG, setSVG] = useState(null)
	const [diagram, setDiagram] = useState(null)
	//const router = useRouter()
	const { data, isLoading, isError } = useGetProjectQuery(params.id)
	const project = data || {}
	console.log({ data, project })

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
			if (!container.current) return
			if (!canvas.current) return
			if (!properties.current) return
			if (!bpmnInstance.current) return
			try {
				await bpmnInstance.current.importXML(xml)
				console.log('success!')
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
			console.log('opening project.bpmnFile')
			openDiagram(project.bpmnFile)
		} else {
			console.log('opening newDiagram')
			openDiagram(diagramXML)
		}

		return () => bpmnInstance.current?.destroy()
	}, [isLoading, isError])

	// auto save
	useEffect(() => {
		if (!bpmnInstance.current) return
		const autoSave = async () => {
			const { xml } = await bpmnInstance.current.saveXML({ format: true })
			const { svg } = await bpmnInstance.current.saveSVG()
		}
		if (window) {
			window.addEventListener('click', autoSave)
		}
		return () => {
			window.removeEventListener('click', autoSave)
		}
	}, [])

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
