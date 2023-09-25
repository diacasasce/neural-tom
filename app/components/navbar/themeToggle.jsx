'use client'
import React, { useEffect } from 'react'
// import { useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const ThemeToggle = (props) => {
	// const [theme, setTheme] = useState(false)
	// const themeToggler = () => {
	// 	console.log('theme toggler')
	// 	theme ? setTheme(false) : setTheme(true)
	// }
	return (
		<button
			className="btn btn-circle"
			onClick={() => {
				console.log('theme toggler')
			}}
		>
			click me
		</button>
	)
}

export default ThemeToggle
