'use client'
import React from 'react'
import {
	PencilSquareIcon,
	TrashIcon,
	EyeIcon,
} from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { deleteProject } from '../../lib/redux/slices/projectSlice'
import { isDraft } from '@reduxjs/toolkit'
const ProjectCard = ({ project }) => {
	const { id, name, description, thumbnail, status } = project
	const dispatch = useDispatch()
	const router = useRouter()
	return (
		<div className="card bg-base-100 shadow-xl image-full">
			<div className="flex">
				<img
					className="justify-center w-15 p-2"
					src={
						thumbnail
							? thumbnail
							: `https://api.dicebear.com/7.x/rings/svg?seed=${id}`
					}
					alt={`${name} thumbnail`}
				/>
			</div>
			<div className="card-body">
				<h3 className="card-title ">{name}</h3>
				<p>{description}</p>
				<div className="card-actions justify-end">
					<button className="btn btn-primary btn-xs">
						<EyeIcon className="w-5 h-5" />
					</button>
					<button
						className="btn btn-primary btn-xs"
						disabled={status !== 'draft'}
						onClick={() => {
							router.push(`/bpmn/${id}/edit`)
						}}
					>
						<PencilSquareIcon className="w-5 h-5" />
					</button>
					<button
						className="btn btn-primary btn-xs"
						onClick={() => {
							dispatch(deleteProject(id))
						}}
					>
						<TrashIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
