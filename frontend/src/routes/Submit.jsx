import { useNavigate } from "react-router-dom";

function Submit() {
	const navigate = useNavigate();

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200'>
			<div className='bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center'>
				<h1 className='text-4xl font-bold text-green-600 mb-4'>
					Test Submitted Successfully!
				</h1>
				<p className='text-lg text-gray-700 mb-6'>
					Thank you for completing the test. Your responses have been recorded
					and submitted. You will receive your evaluation via email within the
					next hour.
				</p>
				<button
					onClick={() => navigate("/test")}
					className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors'
				>
					Back to Test List
				</button>
			</div>
		</div>
	);
}

export default Submit;
