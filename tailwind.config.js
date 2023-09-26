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
					...require('daisyui/src/theming/themes')['[data-theme=dark]'],
					primary: '#793ef9',
					'primary-focus': '#570df8',
					'primary-content': '#ffffff',

					secondary: '#f000b8',
					'secondary-focus': '#bd0091',
					'secondary-content': '#ffffff',

					accent: '#37cdbe',
					'accent-focus': '#2ba69a',
					'accent-content': '#ffffff',

					neutral: '#2a2e37',
					'neutral-focus': '#16181d',
					'neutral-content': '#ffffff',

					'base-100': '#3b424e',
					'base-200': '#2a2e37',
					'base-300': '#16181d',
					'base-content': '#ebecf0',

					info: '#66c7ff',
					success: '#87cf3a',
					warning: '#e1d460',
					error: '#ff6b6b',

					'--rounded-box': '1rem',
					'--rounded-btn': '.5rem',
					'--rounded-badge': '1.9rem',

					'--animation-btn': '.25s',
					'--animation-input': '.2s',

					'--btn-text-case': 'uppercase',
					'--navbar-padding': '.5rem',
					'--border-btn': '1px',
				},
			},
		],
	},
	plugins: [require('daisyui')],
}
