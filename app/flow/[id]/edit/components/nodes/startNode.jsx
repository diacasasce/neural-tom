/* eslint-disable react/display-name */
import React, { memo } from 'react'
import Handles from './handles'

const StartNode = memo(({ data, selected }) => {
	const { id } = data
	return (
		<div
			className={` border-2 ${
				selected ? 'border-base-300' : 'border-black'
			}  border-solid rounded-full bg-white p-4 z-10`}
		>
			<Handles id={id} type={'source'} />
		</div>
	)
})
export default StartNode
