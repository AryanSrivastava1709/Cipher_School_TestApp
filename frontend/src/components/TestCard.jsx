import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TestCard({ test }) {
	return (
		<div className='bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-blue-300'>
			<img
				src='https://static.vecteezy.com/system/resources/previews/002/958/141/original/exam-and-quiz-vector.jpg'
				alt='Test Image'
				className='w-full h-40 object-cover'
			/>
			<div className='p-4'>
				<h2 className='text-2xl font-bold text-gray-800 mb-2'>{test.title}</h2>
				<p className='text-gray-700 mb-4'>{test.descriptions}</p>
				<p className='text-gray-600 mb-4 text-sm'>
					Questions: {test.questions.length}
				</p>
				<Link
					to={`/test/${test._id}`}
					className='inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
				>
					Take Test
				</Link>
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
