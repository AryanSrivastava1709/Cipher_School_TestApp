import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
	const location = useLocation();
	const { logout } = useUserStore();
	const [isOpen, setIsOpen] = useState(false);

	const showNavbar = !location.pathname.startsWith("/test/");

	if (!showNavbar) return null;

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleLinkClick = () => {
		setIsOpen(false); // Close the dropdown when a link is clicked
	};

	return (
		<nav className='bg-blue-600 text-white p-4'>
			<div className='container mx-auto flex items-center justify-between'>
				<div className='text-2xl font-semibold'>
					<Link to='/' className='hover:text-gray-200'>
						Quiz Master
					</Link>
				</div>

				{/* Menu Button for small screens */}
				<div className='block lg:hidden'>
					<button
						onClick={toggleMenu}
						className={`text-white text-2xl transition-transform duration-300 ${
							isOpen ? "transform rotate-90" : ""
						}`}
					>
						{isOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>

				{/* Navigation Links */}
				<div
					className={`lg:flex lg:items-center lg:space-x-4 ${
						isOpen
							? "absolute top-16 left-0 w-full bg-blue-600 flex flex-col items-center z-50"
							: "hidden"
					} lg:static lg:w-auto lg:z-auto`}
				>
					<Link
						to='/'
						className='block lg:inline-block hover:text-gray-200 py-2 px-4 mb-2 lg:mb-0'
						onClick={handleLinkClick}
					>
						Home
					</Link>
					<Link
						to='/test'
						className='block lg:inline-block hover:text-gray-200 py-2 px-4 mb-2 lg:mb-0'
						onClick={handleLinkClick}
					>
						Test
					</Link>
					<Link
						to='/profile'
						className='block lg:inline-block hover:text-gray-200 py-2 px-4 mb-2 lg:mb-0'
						onClick={handleLinkClick}
					>
						Profile
					</Link>
					<button
						onClick={() => {
							logout();
							handleLinkClick(); // Close dropdown after logout
						}}
						className='block lg:inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mb-2 lg:mb-0'
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
