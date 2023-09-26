'use client'

import { createSlice } from '@reduxjs/toolkit'
import mockProjects from '../../../../mock/projects'

const initialState = {
	projects: [...mockProjects],
}

export const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProject: (state, action) => {
			state.projects.push(action.payload)
		},
		deleteProject: (state, action) => {
			state.projects = state.projects.filter((project) => {
				return project.id !== action.payload
			})
		},
		updateProject: (state, action) => {
			state.projects = state.projects.map((project) => {
				if (project.id === action.payload.id) {
					return {
						...project,
						...action.payload,
					}
				}
				return project
			})
		},
	},
})

export const { addProject, deleteProject, updateProject } = projectSlice.actions

export default projectSlice.reducer
