'use client'
import React from 'react'
import ProjectCard from './projectCard'
import CreateButton from './createButton'
import { useSelector } from 'react-redux'

const Dashboard = (props) => {
	const projects = useSelector((state) => state.projects.projects)
	console.log(projects)
	return (
		<main className=" pt-20 h-screen w-screen z-0">
			<div className="grid grid-cols-8 fixed">
				<div className="col-start-1 col-span-6 flex flex-wrap align-baseline">
					<h1 className="text-primary-content text-2xl pl-8">
						Your Prototypes
					</h1>
				</div>
				<div className="col-start-8 col-span-1">
					<CreateButton />
				</div>
				<div className="col-start-1 col-span-8 p-5">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{projects.map((project, idx) => {
							return <ProjectCard project={project} key={`prc-${idx}`} />
						})}
					</div>
				</div>
			</div>
		</main>
	)
}

export default Dashboard
