/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	daisyui: {
		themes: [
			{
				dark: {
					...require('daisyui/src/theming/themes')['[data-theme=light]'],
					primary: '#2F69DE',
					'primary-focus': '#295DC4',
					'primary-content': '#ffffff',
					secondary: '#0F8385',
					'secondary-focus': '#0D797A',
					'secondary-content': '#ffffff',
					accent: '#4D2DB7',
					'accent-focus': '#3E2491',
					'accent-content': '#ffffff',
					neutral: '#003B49',
					'neutral-focus': '#002B36',
					'neutral-content': '#ffffff',
					'base-100': '#ffffff',
					'base-200': '#f9fafb',
					'base-300': '#ced3d9',
					'base-content': '#002B36',
					info: '#2452AD',
					success: '#0C8741',
					warning: '#CF4919',
					error: '#E61E24',
					'--rounded-box': '1rem',
					'--rounded-btn': '2rem',
					'--rounded-badge': '1rem',
					'--animation-btn': '.25s',
					'--animation-input': '.2s',
					'--btn-text-case': 'uppercase',
					'--navbar-padding': '0.5rem',
					'--border-btn': '1px',
					'.landing-bg': {
						backgroundColor: '#EDF2FC',
					},
					'.w-50vw': {
						width: '50vw',
					},
					'.w-30vw': {
						width: '30vw',
					},
					'.handle': {
						width: '10%',
						height: '100%',
						background: 'blue',
						position: 'absolute',
						top: 0,
						left: 0,
						borderRadius: 0,
						transform: 'none',
						border: 'solid 2px red',
						opacity: 0,
					},
					'.min-h-unset': {
						minHeight: 'unset',
					},
					'.react-flow__node-lane': {
						zIndex: '-1!important',
					},
				},
			},
		],
	},
	plugins: [require('daisyui')],
}
