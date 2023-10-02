import { prisma } from '../../lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	console.log('GET')
	const projects = await prisma.project.findMany()
	return NextResponse.json(projects)
}

export async function POST(request) {
	const body = await request.json()

	const project = await prisma.project.create({
		data: {
			...body,
		},
	})
	return NextResponse.json(project)
}
