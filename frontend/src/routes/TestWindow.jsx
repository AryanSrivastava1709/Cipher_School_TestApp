import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useTestStore from "../stores/testStore";
import Loader from "../components/Loader";
import useUserStore from "../stores/userStore";

function TestWindow() {
	const { id } = useParams();
	const { user } = useUserStore();
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const { fetchTestById, currentTest, setCurrentTest, isLoading } =
		useTestStore();
	const [timer, setTimer] = useState(1800);
	const [totalTime, setTotalTime] = useState(1800);
	const { control, handleSubmit, getValues, setValue } = useForm();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selections, setSelections] = useState({});

	const handleSubmitForm = useCallback(async () => {
		const submissionData = {
			testId: id,
			userId: user.id,
			selections: Object.entries(selections).map(([questionIndex, option]) => ({
				questionId: currentTest.test.questions[parseInt(questionIndex, 10)]._id,
				option,
				savedAt: new Date().toISOString(),
			})),
		};

		console.log("Submission Data:", submissionData);
		alert("Test submitted automatically due to timer expiration");
		navigate("/submit");
	}, [selections, currentTest, id, user.id, navigate]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetchTestById(id);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, [id, fetchTestById]);

	useEffect(() => {
		if (currentTest?.test) {
			const duration = currentTest.test.questions.length * 90;
			setTotalTime(duration);
			setTimer(duration);

			currentTest.test.questions.forEach((_, index) => {
				setValue(`question_${index}`, selections[index] || "");
			});
		}
	}, [currentTest, setValue, selections]);

	useEffect(() => {
		if (timer <= 0) {
			handleSubmitForm();
			return;
		}

		const intervalId = setInterval(() => setTimer((t) => t - 1), 1000);
		return () => clearInterval(intervalId);
	}, [timer, handleSubmitForm]);

	const handleQuitTest = () => {
		setCurrentTest(null);
		navigate("/test");
	};

	const handleQuestionClick = (index) => {
		setSelections((prevSelections) => ({
			...prevSelections,
			[currentQuestionIndex]: getValues(`question_${currentQuestionIndex}`),
		}));
		setCurrentQuestionIndex(index);
		setValue(`question_${index}`, selections[index] || "");
	};

	const handleNavClick = (direction) => {
		setSelections((prevSelections) => ({
			...prevSelections,
			[currentQuestionIndex]: getValues(`question_${currentQuestionIndex}`),
		}));
		setCurrentQuestionIndex((prevIndex) => {
			const newIndex =
				direction === "prev"
					? Math.max(prevIndex - 1, 0)
					: Math.min(
							prevIndex + 1,
							(currentTest?.test?.questions.length || 1) - 1
					  );
			setValue(`question_${newIndex}`, selections[newIndex] || "");
			return newIndex;
		});
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
	};

	const progress = ((totalTime - timer) / totalTime) * 100;

	if (isLoading) return <Loader />;

	if (error)
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

	if (!currentTest || !currentTest.test)
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

	return (
		<div className='flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-200'>
			{/* Timer Bar */}
			<div className='bg-blue-600 text-white py-2 px-4'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-semibold'>Time Remaining:</span>
					<span className='text-lg font-semibold'>{formatTime(timer)}</span>
				</div>
				<div className='w-full bg-gray-300 mt-2 rounded-full'>
					<div
						className='bg-blue-500 h-2 rounded-full'
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>

			{/* Main Content */}
			<div className='flex flex-1'>
				{/* Sidebar Navigation */}
				<div className='w-72 bg-white shadow-xl p-6 border-r border-gray-300'>
					<h2 className='text-2xl font-semibold mb-6 text-gray-800'>
						Questions
					</h2>
					<div className='space-y-4'>
						{currentTest.test.questions.map((_, index) => (
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
						<h1 className='text-4xl font-bold text-gray-800 mb-6'>
							{currentTest.test.title}
						</h1>
						<div className='mb-8'>
							<p className='text-2xl font-semibold text-gray-700 mb-6'>
								{currentTest.test.questions[currentQuestionIndex].question}
							</p>
							<form onSubmit={handleSubmit(handleSubmitForm)}>
								<div className='space-y-4'>
									{currentTest.test.questions[currentQuestionIndex].options.map(
										(option, index) => (
											<div key={index} className='flex items-center'>
												<Controller
													name={`question_${currentQuestionIndex}`}
													control={control}
													render={({ field }) => (
														<input
															type='radio'
															{...field}
															value={option}
															className='mr-4 h-6 w-6 text-blue-500'
															checked={field.value === option}
														/>
													)}
												/>
												<label className='text-lg text-gray-700'>
													{option}
												</label>
											</div>
										)
									)}
								</div>

								{/* Navigation Buttons */}
								<div className='flex justify-between items-center mt-8'>
									<button
										type='button'
										onClick={() => handleNavClick("prev")}
										className='px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all'
										disabled={currentQuestionIndex === 0}
									>
										Previous
									</button>
									<button
										type='button'
										onClick={() => handleNavClick("next")}
										className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors'
										disabled={
											currentQuestionIndex ===
											(currentTest?.test?.questions.length || 1) - 1
										}
									>
										Next
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Buttons */}
			<div className='bg-white p-4 border-t border-gray-300'>
				<div className='flex justify-between'>
					<button
						onClick={handleQuitTest}
						className='px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors'
					>
						Quit Test
					</button>
					<button
						type='button'
						onClick={handleSubmitForm}
						className='px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors'
					>
						Submit Test
					</button>
				</div>
			</div>
		</div>
	);
}

export default TestWindow;
