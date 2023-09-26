import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil'
import { TextAreaProp, TextFieldProp } from '../../common/property-fields'
import { createElement } from '../../common/utils'

export default function NextTaskProps(props) {
	const { element, injector } = props
	const nextTasks = getNextTasks(getBusinessObject(element))?.get('rules') || []
	return {
		items: nextTasks.map((taskRule) =>
			NextTaskItem({ taskRule, element, injector })
		),
		add: addItem({ injector, element }),
		shouldSort: false,
	}
}

function NextTaskItem(props) {
	const { taskRule, element, injector } = props
	const modeling = injector.get('modeling')
	return {
		id: `${taskRule.id}_section`,
		label: taskRule.name || '[ New Rule ]',
		entries: [
			TextFieldProp({
				element,
				id: `${taskRule.id}_name`,
				propertyId: 'name',
				ruleId: taskRule.id,
				label: 'Rule Name',
				getValue: GetValue,
				setValue: SetValue,
			}),
			TextAreaProp({
				element,
				id: `${taskRule.id}_description`,
				propertyId: 'description',
				ruleId: taskRule.id,
				label: 'Description',
				getValue: GetValue,
				setValue: SetValue,
				autoResize: false,
			}),
			TextFieldProp({
				element,
				id: `${taskRule.id}_next`,
				propertyId: 'next',
				ruleId: taskRule.id,
				label: 'Next ID',
				getValue: GetValue,
				setValue: SetValue,
			}),
		],
		autoFocusEntry: `${taskRule.id}_name`,
		remove: removeItem({ modeling, element, taskRule }),
	}
}

function SetValue({ modeling, props }) {
	return (value) => {
		const { propertyId, ruleId, element } = props
		const nextTasks =
			getNextTasks(getBusinessObject(element))?.get('rules') || []
		const nextTask = nextTasks.find((nextTask) => nextTask.get('id') === ruleId)
		modeling.updateModdleProperties(element, nextTask, {
			[propertyId]: value,
		})
	}
}

function GetValue({ props }) {
	return (element) => {
		const nextTasks = getNextTasks(getBusinessObject(element))?.get('rules')
		const { propertyId, ruleId } = props
		const nextTask = nextTasks.find((nextTask) => nextTask.get('id') === ruleId)
		return nextTask ? nextTask[propertyId] : ''
	}
}

function getNextTasks(businessObject) {
	const BO = is(businessObject, 'bpmn:ExtensionElements')
		? businessObject
		: businessObject.get('extensionElements')
	if (!BO) return null
	const values = BO.get('values')
	const nextTasks = values.find((value) => value.$type === 'tom:Next_Tasks')
	if (!nextTasks) return null
	return nextTasks
}

function addItem({ injector, element }) {
	const modeling = injector.get('modeling')
	const moddle = injector.get('moddle')
	const bpmnFactory = injector.get('bpmnFactory')
	return function (event) {
		event.stopPropagation()
		const businessObject = getBusinessObject(element)

		// ensure extensionsElements exists
		let extensionElements = businessObject.get('extensionElements')
		if (!extensionElements) {
			extensionElements = createElement(
				'bpmn:ExtensionElements',
				{
					values: [],
				},
				businessObject,
				bpmnFactory
			)
			modeling.updateModdleProperties(element, businessObject, {
				extensionElements,
			})
		}
		let nextTasks = getNextTasks(extensionElements)
		if (!nextTasks) {
			nextTasks = createElement(
				'tom:Next_Tasks',
				{
					id: moddle.ids.nextPrefixed('nt_', nextTasks),
					condition: null,
				},
				extensionElements,
				bpmnFactory
			)
			modeling.updateModdleProperties(element, extensionElements, {
				values: [...extensionElements.get('values'), nextTasks],
			})
		}

		const rule = createElement(
			'tom:Rule',
			{
				name: '',
				description: '',
				nextId: '',
			},
			nextTasks,
			bpmnFactory
		)
		rule.id = moddle.ids.nextPrefixed('rule_', rule)
		modeling.updateModdleProperties(element, nextTasks, {
			rules: [...nextTasks.get('rules'), rule],
		})
	}
}

function removeItem({ modeling, element, taskRule }) {
	return function (event) {
		event.stopPropagation()
		const nextTasksBO = getNextTasks(getBusinessObject(element))
		const nextTasks = nextTasksBO?.get('rules')
		modeling.updateModdleProperties(element, nextTasksBO, {
			rules: nextTasks.filter((nextTask) => nextTask.get('id') !== taskRule.id),
		})
	}
}
