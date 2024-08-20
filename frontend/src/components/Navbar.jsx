import React from "react";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../stores/userStore";

function Navbar() {
	const location = useLocation();
	const { logout } = useUserStore(); // Assuming you have a logout function in your user store

	// Determine if Navbar should be displayed based on the current route
	const showNavbar = !location.pathname.startsWith("/test/");

	if (!showNavbar) return null;

	return (
		<nav className='bg-blue-600 text-white p-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='text-2xl font-semibold'>
					<Link to='/' className='hover:text-gray-200'>
						QuizApp
					</Link>
				</div>
				<div className='space-x-4'>
					<Link to='/' className='hover:text-gray-200'>
						Home
					</Link>
					<Link to='/test' className='hover:text-gray-200'>
						Test
					</Link>
					<Link to='/profile' className='hover:text-gray-200'>
						Profile
					</Link>
					<button
						onClick={logout}
						className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg'
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
