import { assign } from 'min-dash'
import XMLParser from 'react-xml-parser'
import xmlFormat from 'xml-formatter'

const ExportXML = (xml) => {
	const parser = new XMLParser()
	const xmlObject = parser.parseFromString(xml)
	const mappedProcesses = xmlObject
		.getElementsByTagName('bpmn:process')
		.map((process) => {
			const unneeded = [
				'bpmn:laneSet',
				'bpmn:sequenceFlow',
				'bpmn:incoming',
				'bpmn:outgoing',
			]
			const mappedProcess = process
			mappedProcess.name = mappedProcess.name.split(':')[1]
			const sequenceFlows = process.getElementsByTagName('bpmn:sequenceFlow')
			let elements = process.getElementsByTagName('*').map((element) => {
				const children = element.children
					.filter((child) => {
						if (
							element.name === 'bpmn:task' ||
							element.name === 'bpmn:startEvent' ||
							element.name === 'bpmn:endEvent'
						) {
							if (child.name === 'bpmn:incoming') {
								const incoming = Array.isArray(element.attributes.previous)
									? [...element.attributes.previous]
									: []
								incoming.push(
									sequenceFlows.find(
										(sequenceFlow) => sequenceFlow.attributes.id === child.value
									).attributes.sourceRef
								)
								element.attributes.previous = incoming
							}
							if (child.name === 'bpmn:outgoing') {
								const outgoing = Array.isArray(element.attributes.next)
									? [...element.attributes.next]
									: []
								outgoing.push(
									sequenceFlows.find(
										(sequenceFlow) => sequenceFlow.attributes.id === child.value
									).attributes.targetRef
								)
								element.attributes.next = outgoing
							}

							return (
								child.name !== 'bpmn:incoming' && child.name !== 'bpmn:outgoing'
							)
						}

						return true
					})
					.map((child) => {
						if (child.name === 'bpmn:extensionElements') {
							return [...child.children]
						}
						return child
					})
					.flat()
				if (element.name === 'bpmn:startEvent') element.name = 'bpmn:start'
				if (element.name === 'bpmn:endEvent') element.name = 'bpmn:end'
				if (element.name === 'bpmn:task') {
					const attrChildren = Object.keys(element.attributes)
						.filter((key) => key.split('_')[0] === 'task')
						.map((key) => {
							const xml = parser.parseFromString(
								`<${key}>${element.attributes[key]}</${key}>`
							)
							delete element.attributes[key]
							return xml
						})
					children.unshift(...attrChildren)
				}
				return {
					...element,
					name: element.name.split(':')[1],
					children,
					_contained: false,
				}
			})
			mappedProcess.children = mappedProcess.children
				.map((child) => {
					// delete unneeded elements from the process
					if (unneeded.includes(child.name)) {
						return [...child.children]
					}
					return elements.find(
						(element) => element.attributes.id === child.attributes.id
					)
				})
				.flat()
				.map((child) => {
					// add element TO LANES
					if (child.name === 'bpmn:lane') {
						const roles = parser.parseFromString('<roles />')
						const role = parser.parseFromString('<role />')
						assign(role.attributes, child.attributes)
						delete role.attributes.id
						roles.children.push(role)
						return {
							...elements.find(
								(element) => element.attributes.id === child.attributes.id
							),
							children: [
								roles,
								...child.children
									.filter((child) => {
										console.log(child.name, child.name === 'bpmn:childLaneSet')
										if (child.name === 'bpmn:childLaneSet') {
											return false
										}
										return true
									})
									.map((laneChild) => {
										if (laneChild.name === 'bpmn:flowNodeRef') {
											const LCElement = elements.find(
												(element) => element.attributes.id === laneChild.value
											)
											LCElement._contained = true
											return LCElement
										}
										return elements.find(
											(element) =>
												element.attributes.id === laneChild.attributes.id
										)
									}),
							],
						}
					}
					return elements.find(
						(element) => element.attributes.id === child.attributes.id
					)
				})
				.filter((child) => {
					return !elements.find(
						(element) => element.attributes.id === child.attributes.id
					)._contained
				})
			return mappedProcess
		})
	return mappedProcesses.map((process) => {
		return xmlFormat(parser.toString(process).replaceAll('tom:', ''))
	})
}
export default ExportXML
