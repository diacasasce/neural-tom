import Link from 'next/link'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import LandingImage from './resources/landingImage.svg'

export default function Home() {
	return (
		<>
			<main className="hero min-h-screen landing-bg">
				<div className="hero-content text-center sm:text-left flex-col sm:flex-row-reverse">
					<LandingImage className="w-50vw " />
					<div className="max-w-xs">
						<h1 className="text-5xl font-bold">Smart Planning</h1>
						<h1 className="text-5xl font-bold">Smarter Outcomes</h1>
						<p className="py-6">
							TOM automates the entire software development process using
							natural language procesing. TOM autonomously handles the
							construction of all stages and components of the DevOps process,
							simplifying and modernizing your development projects like never
							before.
						</p>
						<Link href="/dashboard" className="btn btn-primary">
							Get Started
							<ArrowLongRightIcon className="w-6 h-6" />
						</Link>
					</div>
				</div>
			</main>
		</>
	)
}
