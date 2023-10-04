import { NextResponse } from 'next/server'
//

const xmlFromJSON = (json) => {
	const { name, attributes, value, children } = json
	const getAttrStr = (attrs) => {
		if (!attrs) return ''
		return Object.keys(attrs)
			.map((key) => ` ${key}="${attrs[key]}"`)
			.join('')
	}
	const childrenStr = (children || [])
		.map((child) => xmlFromJSON(child))
		.join('')
	const result = `<${name} ${getAttrStr(attributes)}>${childrenStr}${
		value || ''
	}</${json.name}>`
	return result
}

export async function POST(request) {
	const body = await request.json()
	const xml = await xmlFromJSON(body)
	const api = await fetch(
		'https://tom-backend-turbo.onrender.com/process_xml',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/xml',
			},
			body: xml,
		}
	)
		.then((res) => res.json())
		.catch((err) => console.log(err))
	return NextResponse.json(api)
}
