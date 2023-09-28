'use client'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectsApi = createApi({
	reducerPath: 'projectsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
	}),
	tagTypes: ['Projects'],
	endpoints: (builder) => ({
		getProjects: builder.query({
			query: () => '/projects',
			providesTags: (result) => {
				const tags = result.map(({ id }) => ({ type: 'Projects', id }))
				return result ? [...tags, 'Projects'] : ['Projects']
			},
		}),
		getProject: builder.query({
			query: (id) => `/projects/${id}`,
			providesTags: (result, error, id) => [{ type: 'Projects', id }],
		}),
		createProject: builder.mutation({
			query: (body) => ({
				url: '/projects',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Projects'],
		}),
		updateProject: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `/projects/${id}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Projects', id }],
		}),
		deleteProject: builder.mutation({
			query: (id) => ({
				url: `/projects/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => [{ type: 'Projects', id }],
		}),
	}),
})

export const {
	useGetProjectsQuery,
	useGetProjectQuery,
	useCreateProjectMutation,
	useDeleteProjectMutation,
} = projectsApi
