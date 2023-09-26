import React from 'react'
import UserDropdown from './userDropdown'
import Link from 'next/link'
import Logo from '../../resources/logo'

const NavBar = (props) => {
	return (
		<nav className="navbar fixed bg-primary z-50">
			<div className="navbar-start">
				<Link href="/dashboard" className="normal-case text-xl">
					<Logo className="w-12 h-12 fill-white" />
				</Link>
			</div>
			<div className="navbar-end">
				<UserDropdown />
			</div>
		</nav>
	)
}

export default NavBar
