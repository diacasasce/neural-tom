'use client'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { projectsApi } from './redux/slices/projectSlice'
export const Providers = ({ children }) => {
	return <ApiProvider api={projectsApi}>{children}</ApiProvider>
}
