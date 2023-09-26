'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { addProject } from '../../lib/redux/slices/projectSlice'
import slugify from 'slugify'

const CreateModal = ({ isOpen, onClose }) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const [projectName, setProjectName] = useState('')
	const [projectDescription, setProjectDescription] = useState('')
	const [projectRepository, setProjectRepository] = useState('')
	const createProject = () => {
		const project = {
			id: slugify(projectName),
			name: projectName,
			description: projectDescription,
			repository: projectRepository,
			status: 'draft',
		}
		dispatch(addProject(project))
	}
	return (
		<dialog
			id="modal"
			className="modal"
			open={isOpen}
			onClose={() => {
				onClose()
			}}
		>
			<div className="modal-box bg-neutral-focus card overflow-hidden">
				<h1 className="text-2xl text-primary-content">Create Project</h1>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text  text-primary-content">
							Project Name
						</span>
					</label>
					<input
						type="text"
						placeholder="name"
						className="input input-bordered input-sm w-full"
						value={projectName}
						onChange={(event) => {
							setProjectName(event.target.value)
						}}
					/>
					<label className="label">
						<span className="label-text text-primary-content">
							project Description
						</span>
					</label>
					<textarea
						className="textarea textarea-bordered h-24 textarea-sm w-full"
						placeholder="Project Description"
						value={projectDescription}
						onChange={(event) => {
							setProjectDescription(event.target.value)
						}}
					></textarea>
					<label className="label">
						<span className="label-text text-primary-content">
							Project Repository
						</span>
					</label>
					<input
						type="text"
						placeholder="name"
						className="input input-bordered input-sm w-full"
						value={projectRepository}
						onChange={(event) => {
							setProjectRepository(event.target.value)
						}}
					/>
				</div>
				<div className="modal-action">
					<form method="dialog" className="flex gap-2">
						<button
							className="btn btn-primary btn-sm"
							onClick={(event) => {
								event.preventDefault()
								console.log('create', { event })
								createProject()
								router.push(`/bpmn/${slugify(projectName)}/edit`)
							}}
						>
							Create
						</button>
						<button className="btn btn-sm">Close</button>
					</form>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	)
}

export default CreateModal
