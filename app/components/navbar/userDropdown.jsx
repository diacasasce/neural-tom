import React from 'react'
import ThemeToggle from './themeToggle'
import Link from 'next/link'

const UserDropdown = (props) => {
	return (
		<div className="dropdown dropdown-end z-40">
			<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
				<div className="w-10 rounded-full">
					<img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Mimi" />
				</div>
			</label>
			<ul
				tabIndex={0}
				className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
			>
				<li>
					<a className="justify-between">
						Profile
						<span className="badge">New</span>
					</a>
				</li>
				<li>
					<a>Settings</a>
				</li>
				<li>
					<Link href="/">Logout</Link>
				</li>
			</ul>
		</div>
	)
}

export default UserDropdown
