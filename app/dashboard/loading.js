import React from 'react'

const loading = () => {
	return (
		<main>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<span className="loading loading-infinity w-80"></span>
					</div>
				</div>
			</div>
		</main>
	)
}

export default loading
