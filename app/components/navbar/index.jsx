import React from 'react'
import UserDropdown from './userDropdown'

const NavBar = (props) => {
	return (
		<nav className="navbar fixed bg-base-100 z-50">
			<div className="navbar-start">
				<a className="btn btn-ghost normal-case text-xl">ND</a>
			</div>
			<div className="navbar-end">
				<UserDropdown />
			</div>
		</nav>
	)
}

export default NavBar
