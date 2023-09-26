/* Core */
import { configureStore } from '@reduxjs/toolkit'
import { ProjectReducer } from './slices'

export const reduxStore = configureStore({
	reducer: {
		projects: ProjectReducer,
	},
})
