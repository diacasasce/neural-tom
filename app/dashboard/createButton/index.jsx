'use client'
import React, { useState } from 'react'
import CreateModal from '../createModal'

const CreateButton = () => {
	const [openModal, setOpenModal] = useState(false)
	const closeModalHandler = () => {
		setOpenModal(false)
	}
	const openModalHandler = () => {
		setOpenModal(true)
	}
	console.log('CreateButton')
	return (
		<>
			<div>
				<button
					className="btn btn-primary btn-sm"
					onClick={() => {
						console.log('click')
						openModalHandler()
					}}
				>
					Create
				</button>
			</div>
			<CreateModal isOpen={openModal} onClose={closeModalHandler} />
		</>
	)
}

export default CreateButton
