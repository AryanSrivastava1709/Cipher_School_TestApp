import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300'>
			<div className='bg-white p-8 rounded-lg shadow-lg text-center'>
				<h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
				<p className='text-xl text-gray-600 mb-6'>
					Sorry, the page you’re looking for doesn’t exist.
				</p>
				<Link
					to='/'
					className='inline-block py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					Go to Home
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
