import { prisma } from '../../../lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
	const project = await prisma.project.findUnique({
		where: {
			id: params.id,
		},
	})
	return NextResponse.json(project)
}

export async function DELETE(request, { params }) {
	const project = await prisma.project.delete({
		where: {
			id: params.id,
		},
	})
	return NextResponse.json(project)
}
