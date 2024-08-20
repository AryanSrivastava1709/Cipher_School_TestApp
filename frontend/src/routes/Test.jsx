import { useEffect } from "react";
import useTestStore from "../stores/testStore";
import TestCard from "../components/TestCard";
import Loader from "../components/Loader"; // Import your Loader component

function Test() {
	const { fetchTests, isLoading, tests } = useTestStore();

	useEffect(() => {
		const fetchData = async () => {
			if (!tests || tests.length === 0) {
				await fetchTests();
			}
		};

		fetchData();
	}, [fetchTests, tests]);

	const handleRefresh = async () => {
		// Call fetchTests and update the state
		await fetchTests();
	};

	return (
		<div className='p-8 bg-gray-50 min-h-screen'>
			<div className='bg-white border border-gray-200 rounded-lg shadow-md p-6 relative'>
				<h1 className='text-4xl font-extrabold text-center text-blue-800 mb-12'>
					Explore Our Available Tests
				</h1>
				<button
					onClick={handleRefresh}
					className='absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors'
				>
					Refresh Tests
				</button>
				{isLoading ? (
					<div className='flex justify-center items-center h-64'>
						<Loader />
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
						{tests && tests.length > 0 ? (
							tests.map((test) => <TestCard key={test._id} test={test} />)
						) : (
							<p className='text-center text-gray-500'>No tests available.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Test;
