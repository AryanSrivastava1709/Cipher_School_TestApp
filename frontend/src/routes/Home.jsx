import { Link } from "react-router-dom";

// Replace this with your actual image URL
const placeholderImage =
	"https://media.istockphoto.com/id/1423348389/photo/quiz-time-written-cut-out-yellow-and-white-speech-bubbles-sitting-over-blue-background.jpg?s=612x612&w=0&k=20&c=CvmQ9TYh0MS4QJbPw-tjRKWKkx-8IUHFX1wpTIYlvG4=";

function Home() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300 text-white'>
			{/* Hero Section */}
			<div className='relative w-full max-w-4xl mx-auto text-center py-12 px-6'>
				<img
					src={placeholderImage}
					alt='Quiz App'
					className='w-full h-auto rounded-lg shadow-lg mb-8'
				/>
				<h1 className='text-4xl md:text-6xl font-bold mb-4'>
					Welcome to QuizMaster!
				</h1>
				<p className='text-lg md:text-2xl mb-8'>
					Test your knowledge with our exciting quizzes and challenges.
				</p>
				<Link
					to='/test'
					className='bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md text-xl font-semibold hover:bg-blue-700 transition duration-300'
				>
					Start Quiz
				</Link>
			</div>

			{/* Features Section */}
			<div className='w-full max-w-4xl mx-auto px-6 py-12'>
				<h2 className='text-3xl font-bold text-center mb-12'>What We Offer</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<div className='bg-white text-gray-800 p-6 rounded-lg shadow-lg'>
						<h3 className='text-2xl font-semibold mb-4'>Diverse Quizzes</h3>
						<p>
							Explore a wide range of quizzes on different topics to challenge
							your knowledge.
						</p>
					</div>
					<div className='bg-white text-gray-800 p-6 rounded-lg shadow-lg'>
						<h3 className='text-2xl font-semibold mb-4'>Timely Evaluation</h3>
						<p>
							Submit your answers and receive thorough evaluations of your
							performance over time.
						</p>
					</div>
					<div className='bg-white text-gray-800 p-6 rounded-lg shadow-lg'>
						<h3 className='text-2xl font-semibold mb-4'>
							Personalized Insights
						</h3>
						<p>
							Receive detailed insights and progress reports to help you improve
							your quiz-taking skills.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
