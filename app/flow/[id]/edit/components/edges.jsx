/* eslint-disable react/display-name */
import React, { useCallback } from 'react'
import { useStore, getStraightPath, MarkerType } from 'reactflow'
import { getEdgeParams } from './utils.js'

export const ConnectionLine = ({
	fromX,
	fromY,
	toX,
	toY,
	connectionLineStyle,
}) => {
	const [edgePath] = getStraightPath({
		sourceX: fromX,
		sourceY: fromY,
		targetX: toX,
		targetY: toY,
	})

	return (
		<g>
			<path style={connectionLineStyle} fill="none" d={edgePath} />
			<circle
				cx={toX}
				cy={toY}
				fill="black"
				r={3}
				stroke="black"
				strokeWidth={1.5}
			/>
		</g>
	)
}

export const ConnectionLineStyle = {
	strokeWidth: 3,
	stroke: 'black',
}

export const EdgeOptions = {
	style: { strokeWidth: 3 },
	type: 'floating',
	markerEnd: {
		type: MarkerType.ArrowClosed,
	},
}

export const FloatingEdge = ({ id, source, target, markerEnd, style }) => {
	const sourceNode = useStore(
		useCallback((store) => store.nodeInternals.get(source), [source])
	)
	const targetNode = useStore(
		useCallback((store) => store.nodeInternals.get(target), [target])
	)

	if (!sourceNode || !targetNode) {
		return null
	}

	const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode)

	const [edgePath] = getStraightPath({
		sourceX: sx,
		sourceY: sy,
		targetX: tx,
		targetY: ty,
	})

	return (
		<path
			id={id}
			className="react-flow__edge-path"
			d={edgePath}
			markerEnd={markerEnd}
			style={style}
		/>
	)
}

export const edgeTypes = {
	floating: FloatingEdge,
}
