'use client'
import Modeler from 'bpmn-js/lib/Modeler'

import { assign, isArray } from 'min-dash'

import inherits from 'inherits'

import CustomModule from './custom'

export default function TomModeler(options) {
	Modeler.call(this, options)

	this._customElements = []
}

inherits(TomModeler, Modeler)

TomModeler.prototype._modules = [].concat(TomModeler.prototype._modules, [
	CustomModule,
])

/**
 * Add a single custom element to the underlying diagram
 *
 * @param {Object} customElement
 */
TomModeler.prototype._addCustomShape = function (customElement) {
	this._customElements.push(customElement)

	var canvas = this.get('canvas'),
		elementFactory = this.get('elementFactory')

	var customAttrs = assign({ businessObject: customElement }, customElement)

	var customShape = elementFactory.create('shape', customAttrs)

	return canvas.addShape(customShape)
}

TomModeler.prototype._addCustomConnection = function (customElement) {
	this._customElements.push(customElement)

	var canvas = this.get('canvas'),
		elementFactory = this.get('elementFactory'),
		elementRegistry = this.get('elementRegistry')

	var customAttrs = assign({ businessObject: customElement }, customElement)

	var connection = elementFactory.create(
		'connection',
		assign(customAttrs, {
			source: elementRegistry.get(customElement.source),
			target: elementRegistry.get(customElement.target),
		}),
		elementRegistry.get(customElement.source).parent
	)

	return canvas.addConnection(connection)
}

/**
 * Add a number of custom elements and connections to the underlying diagram.
 *
 * @param {Array<Object>} customElements
 */
TomModeler.prototype.addCustomElements = function (customElements) {
	if (!isArray(customElements)) {
		throw new Error('argument must be an array')
	}

	var shapes = [],
		connections = []

	customElements.forEach(function (customElement) {
		if (isCustomConnection(customElement)) {
			connections.push(customElement)
		} else {
			shapes.push(customElement)
		}
	})

	// add shapes before connections so that connections
	// can already rely on the shapes being part of the diagram
	shapes.forEach(this._addCustomShape, this)

	connections.forEach(this._addCustomConnection, this)
}

/**
 * Get custom elements with their current status.
 *
 * @return {Array<Object>} custom elements on the diagram
 */
TomModeler.prototype.getCustomElements = function () {
	return this._customElements
}

function isCustomConnection(element) {
	return element.type === 'custom:connection'
}
