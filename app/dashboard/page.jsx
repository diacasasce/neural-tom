'use client'
import React from 'react'
import ProjectCard from './projectCard'
import CreateButton from './createButton'
import { useSelector } from 'react-redux'

const Dashboard = (props) => {
	const projects = useSelector((state) => state.projects.projects)
	console.log(projects)
	return (
		<main className="p-20 h-screen w-full z-0">
			<div className="grid grid-cols-8 gap-8">
				<div className="col-start-1 col-span-3 flex flex-wrap align-baseline">
					<h1>Your Prototypes</h1>
				</div>
				<div className="col-start-8 col-span-1">
					<CreateButton />
				</div>
			</div>
			<div className="divider"></div>
			<div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
				{projects.map((project, idx) => {
					return <ProjectCard project={project} key={`prc-${idx}`} />
				})}
			</div>
		</main>
	)
}

export default Dashboard
