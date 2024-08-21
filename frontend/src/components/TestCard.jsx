import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useTestStore from "../stores/testStore";

function TestCard({ test }) {
	const { setCurrentTest } = useTestStore();

	return (
		<div className='bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:border-blue-400'>
			<img
				src='https://static.vecteezy.com/system/resources/previews/002/958/141/original/exam-and-quiz-vector.jpg'
				alt='Test Image'
				className='w-full h-48 object-cover'
			/>
			<div className='p-6'>
				<h2 className='text-2xl font-semibold text-gray-900 mb-2'>
					{test.title}
				</h2>
				<p className='text-gray-700 mb-4'>{test.descriptions}</p>
				<div className='flex justify-between items-center mb-4'>
					<p className='text-gray-600 text-sm'>
						<span className='font-semibold'>Questions:</span>{" "}
						{test.questions.length}
					</p>
					<Link
						to={`/permissions/${test._id}`}
						className='bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors'
					>
						Start Test
					</Link>
				</div>
			</div>
		</div>
	);
}

// PropTypes validation
TestCard.propTypes = {
	test: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		descriptions: PropTypes.string.isRequired,
		questions: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
};

export default TestCard;
