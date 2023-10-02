/* eslint-disable react/display-name */
import React, { memo, useState, useCallback } from 'react'
import { Handle, Position, useStore, NodeResizer, NodeToolbar } from 'reactflow'
import Handles from './handles'

const EndNode = memo(({ data, selected }) => {
	return (
		<div
			className={`border-8 ${
				selected ? 'border-base-300' : 'border-black'
			}  border-solid rounded-full bg-white p-3 z-10`}
		>
			<Handles id={data.id} type={'target'} />
		</div>
	)
})

export default EndNode
