function Footer() {
	return (
		<footer className='bg-gray-800 text-white py-6'>
			<div className='container mx-auto px-4 flex flex-wrap justify-between items-center'>
				<div className='flex-1 text-center md:text-left'>
					<h2 className='text-2xl font-bold mb-2'>QUIZ MASTER</h2>
				</div>
				<div className='flex-1 text-center mb-4 md:mb-0'>
					<a
						href='https://github.com/AryanSrivastava1709/Cipher_School_TestApp/tree/main'
						className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
						target='_blank'
						rel='noopener noreferrer'
					>
						Start My Repo ❤️
					</a>
				</div>
				<div className='flex-1 text-center md:text-right'>
					<p className='text-sm'>
						Created by{" "}
						<a
							href='https://github.com/AryanSrivastava1709'
							className='underline'
							target='_blank'
							rel='noopener noreferrer'
						>
							AryanSrivas1709
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
