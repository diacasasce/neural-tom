import { prisma } from '../../lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const projects = await prisma.project.findMany()
	console.log(projects)
	return NextResponse.json(projects)
}
