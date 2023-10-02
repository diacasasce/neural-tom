import React from 'react'
import { Handle, Position, useStore } from 'reactflow'

const Handles = ({ id, type }) => {
	const connectionNodeIdSelector = (state) => state.connectionNodeId
	const connectionNodeId = useStore(connectionNodeIdSelector)
	const isConnecting = !!connectionNodeId
	switch (type) {
		case 'source':
			return (
				<>
					<Handle
						type="source"
						position={Position.Right}
						key={`rs-${id}`}
						id={`rs-${id}`}
					/>
					<Handle
						type="source"
						position={Position.Bottom}
						key={`bs-${id}`}
						id={`bs-${id}`}
					/>
				</>
			)
		case 'target':
			return (
				<>
					<Handle
						type="target"
						position={Position.Left}
						key={`lt-${id}`}
						id={`lt-${id}`}
						className=""
					/>
					<Handle
						type="target"
						position={Position.Top}
						key={`tt-${id}`}
						id={`tt-${id}`}
						className=""
					/>
				</>
			)
		default:
			return (
				<>
					<Handle
						type="target"
						position={Position.Top}
						key={`tt-${id}`}
						id={`tt-${id}`}
						className=""
					/>
					<Handle
						type="target"
						position={Position.Right}
						key={`rt-${id}`}
						id={`rt-${id}`}
						className=""
					/>
					<Handle
						type="target"
						position={Position.Bottom}
						key={`bt-${id}`}
						id={`bt-${id}`}
						className=""
					/>
					<Handle
						type="target"
						position={Position.Left}
						key={`lt-${id}`}
						id={`lt-${id}`}
						className=""
					/>
					<Handle
						type="source"
						position={Position.Top}
						key={`ts-${id}`}
						id={`ts-${id}`}
						className="z-1 "
					/>
					<Handle
						type="source"
						position={Position.Bottom}
						key={`bs-${id}`}
						id={`bs-${id}`}
						className="z-1 "
					/>
					<Handle
						type="source"
						position={Position.Right}
						key={`rs-${id}`}
						id={`rs-${id}`}
						className="z-1 "
					/>
					<Handle
						type="source"
						position={Position.Left}
						key={`ls-${id}`}
						id={`ls-${id}`}
						className="z-1 "
					/>
				</>
			)
	}
}
export default Handles
