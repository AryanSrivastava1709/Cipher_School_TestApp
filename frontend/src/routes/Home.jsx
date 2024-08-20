import { Link } from "react-router-dom";

const placeholderImage =
	"https://media.istockphoto.com/id/1423348389/photo/quiz-time-written-cut-out-yellow-and-white-speech-bubbles-sitting-over-blue-background.jpg?s=612x612&w=0&k=20&c=CvmQ9TYh0MS4QJbPw-tjRKWKkx-8IUHFX1wpTIYlvG4=";

function Home() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900'>
			{/* Hero Section */}
			<div className='relative w-full max-w-5xl mx-auto text-center py-12 px-6'>
				<img
					src={placeholderImage}
					alt='Quiz App'
					className='w-full h-80 object-cover rounded-lg shadow-xl mb-8'
				/>
				<h1 className='text-4xl md:text-5xl font-bold mb-4'>
					Welcome to QuizMaster!
				</h1>
				<p className='text-lg md:text-xl mb-8'>
					Challenge your mind with our engaging quizzes and discover your
					strengths.
				</p>
				<Link
					to='/test'
					className='bg-blue-700 text-white py-3 px-8 rounded-full shadow-lg text-xl font-semibold hover:bg-blue-800 transition duration-300'
				>
					Start Quiz
				</Link>
			</div>

			{/* Features Section */}
			<div className='w-full max-w-5xl mx-auto px-6 py-12'>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
					Why Choose Us?
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<div className='bg-white text-gray-900 p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105'>
						<h3 className='text-2xl font-bold mb-4'>Diverse Quizzes</h3>
						<p className='text-base'>
							Challenge yourself with a variety of quizzes on multiple topics to
							test and expand your knowledge.
						</p>
					</div>
					<div className='bg-white text-gray-900 p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105'>
						<h3 className='text-2xl font-bold mb-4'>Timely Evaluation</h3>
						<p className='text-base'>
							Receive instant feedback and detailed performance evaluations to
							understand your progress and areas for improvement.
						</p>
					</div>
					<div className='bg-white text-gray-900 p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105'>
						<h3 className='text-2xl font-bold mb-4'>Personalized Insights</h3>
						<p className='text-base'>
							Get personalized insights and progress reports to enhance your
							quiz-taking skills and knowledge.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
