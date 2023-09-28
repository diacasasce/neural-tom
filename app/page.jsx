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
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
							excepturi exercitationem quasi. In deleniti eaque aut repudiandae
							et a id nisi.
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
