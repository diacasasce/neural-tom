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
			console.log({ state, action })
			state.projects.push(action.payload)
		},
		removeProject: (state, action) => {
			state.filter((project) => project.id !== action.payload)
		},
	},
})

export const { addProject, removeProject } = projectSlice.actions

export default projectSlice.reducer
