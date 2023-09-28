'use client'
import React from 'react'
import UserDropdown from './userDropdown'
import Link from 'next/link'
import Logo from '../../resources/logo'
import TextLogo from '../../resources/textLogo'
import { usePathname } from 'next/navigation'

const NavBar = (props) => {
	const pathname = usePathname()
	const isNavBarColorLight = (path) => {
		if (path === '/') return true
		return false
	}
	return (
		<nav
			className={`navbar fixed z-50 ${
				isNavBarColorLight(pathname) ? 'landing-bg' : 'bg-primary'
			}`}
		>
			<div className="navbar-start">
				<Link href="/dashboard" className="normal-case text-xl">
					{!isNavBarColorLight(pathname) && (
						<Logo className={`w-12 h-12 fill-white`} />
					)}
					{isNavBarColorLight(pathname) && (
						<TextLogo className={`pl-3 w-16 h-16`} />
					)}
				</Link>
			</div>
			<div className="navbar-end">
				{!isNavBarColorLight(pathname) && <UserDropdown />}
			</div>
		</nav>
	)
}

export default NavBar
