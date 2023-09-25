import React from 'react'

const ProjectCard = ({ project }) => {
	return (
		<div className="card bg-base-100 shadow-xl image-full">
			<div className="flex">
				<img
					className="justify-center w-15 p-2"
					src={project.thumbnail}
					alt={`${project.name} thumbnail`}
				/>
			</div>
			<div className="card-body">
				<h3 className="card-title">{project.name}</h3>
				<p>{project.description}</p>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">review</button>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
