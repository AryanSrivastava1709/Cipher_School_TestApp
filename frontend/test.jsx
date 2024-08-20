import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTestStore from "../stores/testStore";
import Loader from "../components/Loader";

function TestWindow() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [error, setError] = useState(null);
	const { fetchTestById, currentTest, setCurrentTest, isLoading } =
		useTestStore();
	const [timer, setTimer] = useState(1800); // 30 minutes in seconds

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetchTestById(id);
				setTimer(currentTest.test.questions.length * 90); // 1.5 minute per question
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, [id, fetchTestById]);

	useEffect(() => {
		setCurrentQuestionIndex(0);
	}, [id]);

	useEffect(() => {
		if (timer <= 0) {
			handleSubmit(); // Submit the test when the timer reaches zero
			return;
		}

		const intervalId = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
		}, 1000);

		return () => clearInterval(intervalId); // Cleanup on component unmount or when timer is done
	}, [timer]);

	const handleQuitTest = () => {
		setCurrentTest(null);
		navigate("/test");
	};

	const handleQuestionClick = (index) => {
		setCurrentQuestionIndex(index);
	};

	const handlePrevClick = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const handleNextClick = () => {
		if (currentQuestionIndex < currentTest.test.questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handleSubmit = () => {
		// Implement submission logic here
		alert("Test submitted automatically due to timer expiration");
		navigate("/submit"); // Navigate away or show submission confirmation
	};

	const { title, questions } = currentTest.test;

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
				<p className='text-red-500 text-xl font-semibold mb-4'>{error}</p>
				<button
					onClick={() => navigate(-1)}
					className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors'
				>
					Go Back
				</button>
			</div>
		);
	}

	if (!currentTest || !currentTest.test) {
		return (
			<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
				<p className='text-gray-500 text-xl font-semibold mb-4'>
					Test not found
				</p>
				<button
					onClick={() => navigate("/test")}
					className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors'
				>
					Go Back to Tests
				</button>
			</div>
		);
	}

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
	};

	return (
		<div className='flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200'>
			{/* Sidebar Navigation */}
			<div className='w-72 bg-white shadow-xl p-6 border-r border-gray-300'>
				<h2 className='text-2xl font-semibold mb-6 text-gray-800'>Questions</h2>
				<div className='space-y-4'>
					{questions.map((_, index) => (
						<button
							key={index}
							onClick={() => handleQuestionClick(index)}
							className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
								currentQuestionIndex === index
									? "bg-blue-600 text-white"
									: "bg-gray-100 text-gray-800"
							} hover:bg-blue-500 hover:text-white transition-colors`}
						>
							<span
								className='w-3 h-3 rounded-full mr-3'
								style={{
									backgroundColor:
										currentQuestionIndex === index ? "#ffffff" : "#d1d5db",
								}}
							></span>
							Question {index + 1}
						</button>
					))}
				</div>
			</div>

			{/* Main Content Area */}
			<div className='flex-1 p-8'>
				<div className='bg-white rounded-lg shadow-xl p-8'>
					<h1 className='text-4xl font-bold text-gray-800 mb-6'>{title}</h1>
					<div className='mb-8'>
						<p className='text-2xl font-semibold text-gray-700 mb-6'>
							{questions[currentQuestionIndex].question}
						</p>
						<div className='space-y-4'>
							{questions[currentQuestionIndex].options.map((option, index) => (
								<div key={index} className='flex items-center'>
									<input
										type='radio'
										name='option'
										className='mr-4 h-6 w-6 text-blue-500'
									/>
									<label className='text-lg text-gray-700'>{option}</label>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Buttons */}
					<div className='flex justify-between items-center mt-8'>
						<button
							onClick={handlePrevClick}
							className='px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all'
							disabled={currentQuestionIndex === 0}
						>
							Previous
						</button>
						<button
							onClick={handleNextClick}
							className='px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all'
							disabled={currentQuestionIndex === questions.length - 1}
						>
							Next
						</button>
					</div>
				</div>

				{/* Footer with submit and quit buttons */}
				<div className='mt-8 flex justify-between'>
					<button
						onClick={handleQuitTest}
						className='px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all'
					>
						Quit Test
					</button>
					<button
						onClick={handleSubmit}
						className='px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all'
					>
						Submit
					</button>
				</div>
				{/* Timer Display */}
				<div className='mt-4 text-center text-xl font-semibold'>
					<p>Time Remaining: {formatTime(timer)}</p>
				</div>
			</div>
		</div>
	);
}

export default TestWindow;
