import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
	const filename = params.filename
	const blob = await put(filename, request.body, {
		access: 'public',
	})

	return NextResponse.json(blob)
}
