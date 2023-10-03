import { assign } from 'min-dash'
import download from 'downloadjs'
import { decode } from 'html-entities'

import XMLExport from '../../utils/XMLexport'

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(
	palette,
	create,
	elementFactory,
	spaceTool,
	lassoTool,
	handTool,
	globalConnect,
	translate,
	injector
) {
	this._palette = palette
	this._create = create
	this._elementFactory = elementFactory
	this._spaceTool = spaceTool
	this._lassoTool = lassoTool
	this._handTool = handTool
	this._globalConnect = globalConnect
	this._translate = translate
	this._moddler = injector.get('bpmnjs')

	palette.registerProvider(this)
}

PaletteProvider.$inject = [
	'palette',
	'create',
	'elementFactory',
	'spaceTool',
	'lassoTool',
	'handTool',
	'globalConnect',
	'translate',
	'injector',
]

PaletteProvider.prototype.getPaletteEntries = function () {
	var actions = {},
		create = this._create,
		elementFactory = this._elementFactory,
		spaceTool = this._spaceTool,
		lassoTool = this._lassoTool,
		handTool = this._handTool,
		globalConnect = this._globalConnect,
		translate = this._translate,
		moddler = this._moddler

	function createAction(type, group, className, title, options) {
		function createListener(event) {
			var shape = elementFactory.createShape(assign({ type: type }, options))

			if (options) {
				shape.businessObject.di.isExpanded = options.isExpanded
			}

			create.start(event, shape)
		}

		var shortType = type.replace(/^bpmn:/, '')

		return {
			group: group,
			className: className,
			title: title || 'Create ' + shortType,
			action: {
				dragstart: createListener,
				click: createListener,
			},
		}
	}

	function createParticipant(event, collapsed) {
		create.start(event, elementFactory.createParticipantShape(collapsed))
	}

	assign(actions, {
		'hand-tool': {
			group: 'tools',
			className: 'bpmn-icon-hand-tool',
			title: translate('Activate the hand tool'),
			action: {
				click: function (event) {
					handTool.activateHand(event)
				},
			},
		},
		'lasso-tool': {
			group: 'tools',
			className: 'bpmn-icon-lasso-tool',
			title: translate('Activate the lasso tool'),
			action: {
				click: function (event) {
					lassoTool.activateSelection(event)
				},
			},
		},
		'space-tool': {
			group: 'tools',
			className: 'bpmn-icon-space-tool',
			title: translate('Activate the create/remove space tool'),
			action: {
				click: function (event) {
					spaceTool.activateSelection(event)
				},
			},
		},
		'global-connect-tool': {
			group: 'tools',
			className: 'bpmn-icon-connection-multi',
			title: translate('Activate the global connect tool'),
			action: {
				click: function (event) {
					globalConnect.start(event)
				},
			},
		},
		'tool-separator': {
			group: 'tools',
			separator: true,
		},
		'create.start-event': createAction(
			'bpmn:StartEvent',
			'event',
			'bpmn-icon-start-event-none',
			translate('Create StartEvent')
		),
		'create.end-event': createAction(
			'bpmn:EndEvent',
			'event',
			'bpmn-icon-end-event-none',
			translate('Create EndEvent')
		),
		'create.task': createAction(
			'bpmn:Task',
			'activity',
			'bpmn-icon-task',
			translate('Create Task')
		),
		'create.participant-expanded': {
			group: 'collaboration',
			className: 'bpmn-icon-participant',
			title: translate('Create Pool/Participant'),
			action: {
				dragstart: createParticipant,
				click: createParticipant,
			},
		},
		'second-tool-separator': {
			group: 'buttons',
			separator: true,
		},
		'cloud.deploy': {
			group: 'buttons',
			className: 'tom-cloud-deploy',
			title: translate('deploy to cloud'),
			action: {
				click: async function () {
					//export to xml
					const { tom } = await moddler
						.saveXML({ format: true })
						.then(({ xml }) => {
							return {
								xml: xml,
								tom: XMLExport(xml),
							}
						})
						.catch((err) => console.log(err))
					for (const process of tom) {
						console.log('trigger')
						const body = decode(process)
						console.log(body)
						fetch('http://35.173.244.177:80/process_xml', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/xml',
							},
							body,
							mode: 'no-cors',
						})
							.then((data) => console.log(data))
							.catch((err) => console.log(err))
					}
				},
			},
		},
	})

	return actions
}
