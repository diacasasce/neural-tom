'use client'

import React from 'react'

const CreateButton = (props) => {
	return (
		<div>
			<button
				className="btn btn-primary"
				onClick={() => {
					console.log('create')
				}}
			>
				Create
			</button>
		</div>
	)
}

export default CreateButton
