import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/navbar'
import { Providers as ReduxProviders } from './lib/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Tom',
	description: 'Tom is a BPMN editor with ai deployment',
}

export default function RootLayout({ children }) {
	return (
		<ReduxProviders>
			<html lang="en">
				<body className={`bg-neutral`}>
					<NavBar />
					{children}
				</body>
			</html>
		</ReduxProviders>
	)
}
