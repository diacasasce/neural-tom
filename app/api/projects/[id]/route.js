import { prisma } from '../../../lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
	const { id } = params
	const splitId = id.split('_')
	const project = await prisma.project.findUnique({
		where: {
			id: splitId[0],
		},
	})
	if (splitId[1] === 'BPMN' && project.bpmnFile) {
		const bpmnFile = await fetch(project.bpmnFile).then((res) => res.text())
		return NextResponse.json({
			...project,
			bpmnFile,
		})
	}
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

export async function PATCH(request, { params }) {
	const body = await request.json()
	const project = await prisma.project.update({
		where: {
			id: params.id,
		},
		data: {
			...body,
		},
	})
	return NextResponse.json(project)
}
