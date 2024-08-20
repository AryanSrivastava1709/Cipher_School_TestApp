import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { FaBars, FaTimes } from "react-icons/fa";
import useTestStore from "../stores/testStore";

function Navbar() {
	const location = useLocation();
	const { logout } = useUserStore();
	const [isOpen, setIsOpen] = useState(false);
	const { setTests, setCurrentTest } = useTestStore();

	const showNavbar = !location.pathname.startsWith("/test/");

	if (!showNavbar) return null;

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	// Function to determine if the link is active
	const isActive = (path) => location.pathname === path;

	return (
		<nav className='bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'>
			<div className='container mx-auto flex items-center justify-between p-4'>
				<div className='text-3xl font-bold'>
					<Link
						to='/'
						className='hover:text-gray-100 transition-colors duration-300'
					>
						Quiz Master
					</Link>
				</div>

				{/* Menu Button for small screens */}
				<div className='block lg:hidden'>
					<button
						onClick={toggleMenu}
						className={`text-2xl transition-transform duration-300 ${
							isOpen ? "transform rotate-90" : ""
						}`}
					>
						{isOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>

				{/* Navigation Links */}
				<div
					className={`lg:flex lg:items-center lg:space-x-6 ${
						isOpen
							? "absolute top-16 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center z-50"
							: "hidden"
					} lg:static lg:w-auto lg:z-auto`}
				>
					<Link
						to='/'
						className={`block lg:inline-block py-2 px-4 transition-colors duration-300 rounded-lg ${
							isActive("/") ? "bg-blue-700 font-semibold" : ""
						} hover:bg-blue-600 hover:rounded-lg lg:py-2 lg:px-4 lg:mb-0 mb-2`}
						onClick={handleLinkClick}
					>
						Home
					</Link>
					<Link
						to='/test'
						className={`block lg:inline-block py-2 px-4 transition-colors duration-300 rounded-lg ${
							isActive("/test") ? "bg-blue-700 font-semibold" : ""
						} hover:bg-blue-600 hover:rounded-lg lg:py-2 lg:px-4 lg:mb-0 mb-2`}
						onClick={handleLinkClick}
					>
						Test
					</Link>
					<Link
						to='/profile'
						className={`block lg:inline-block py-2 px-4 transition-colors duration-300 rounded-lg ${
							isActive("/profile") ? "bg-blue-700 font-semibold" : ""
						} hover:bg-blue-600 hover:rounded-lg lg:py-2 lg:px-4 lg:mb-0 mb-2`}
						onClick={handleLinkClick}
					>
						Profile
					</Link>
					<button
						onClick={() => {
							logout();
							setTests(null);
							setCurrentTest(null);
							handleLinkClick();
						}}
						className='block lg:inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 mb-2'
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
