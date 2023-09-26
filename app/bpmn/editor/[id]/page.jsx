'use client'
import React from 'react'
import './bpmn.css'
// import css from node module
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import '@bpmn-io/properties-panel/assets/properties-panel.css'

import { useEffect, useRef } from 'react'
import TomModeler from './modeler'
import gridModule from 'diagram-js-grid'

import diagramXML from './resources/newDiagram.js' // use raw to load as String in VITE
import { BpmnPropertiesPanelModule } from 'bpmn-js-properties-panel'

import taskProviderModule from './properties-provider/task-properties-provider'
import laneProviderModule from './properties-provider/lane-properties-provider'
import eventHandlerModules from './eventHandlers'
import tomExtension from './properties-provider/moodleExtensions/tom.json'

const BpmnEditorPage = ({ params }) => {
	console.log(params)
	const container = useRef()
	const canvas = useRef()
	const properties = useRef()
	const bpmnInstance = useRef()

	useEffect(() => {
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

		async function createNewDiagram() {
			openDiagram(diagramXML)
		}

		async function openDiagram(xml) {
			if (!container.current) return
			if (!canvas.current) return
			if (!properties.current) return
			if (!bpmnInstance.current) return
			try {
				await bpmnInstance.current.importXML(xml)
				console.log('success!')
			} catch (err) {
				if (err) {
					console.error('something went wrong:', err)
				}
			}
		}

		createNewDiagram()
	}, [])

	useEffect(() => {
		return () => bpmnInstance.current?.destroy()
	}, [])

	return (
		<div className="content pt-15 absolute" ref={container}>
			<div className="canvas bg-white" ref={canvas}></div>
			<div className="property_panel inactive relative" ref={properties}></div>
		</div>
	)
}

export default BpmnEditorPage
