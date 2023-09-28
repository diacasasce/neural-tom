'use client'
import React from 'react'
import ProjectCard from './projectCard'
import CreateButton from './createButton'
import { useGetProjectsQuery } from '../lib/redux/slices/projectSlice'
import Loading from '../loading'

const Dashboard = (props) => {
	const { data: projects, isLoading } = useGetProjectsQuery()
	if (isLoading) {
		return <Loading />
	}
	return (
		<main className="pt-14 h-screen w-screen z-0">
			<div className="pt-2 grid grid-cols-8 bg-neutral gap-0 overflow-x-hidden">
				<div className="col-start-1 col-span-8 flex flex-wrap align-baseline fixed z-30 bg-neutral w-screen justify-between ">
					<h1 className="text-primary-content text-2xl pt-4 pb-2 pl-8">
						Your Prototypes
					</h1>
					<CreateButton className="pt-4 pb-2 pr-5" />
				</div>
				<div className="mt-6 col-start-1 col-span-8 p-10">
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
