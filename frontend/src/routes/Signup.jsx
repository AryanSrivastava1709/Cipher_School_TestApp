import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import axios from "axios";

function Signup() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false); // Local loading state
	const [showPassword, setShowPassword] = useState(false);

	// Destructure the register, handleSubmit, formState, and errors properties from the hook
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setIsLoading(true); // Set loading to true when form submission starts

		const userData = {
			name: data.name, // Include name in userData
			email: data.email,
			password: data.password,
		};

		try {
			const res = await axios.post(
				"https://quiz-app-api-seven.vercel.app/api/auth/register",
				userData
			);
			if (res.status === 201) {
				setIsLoading(false);
				toast.success("Account created successfully");
				navigate("/login");
			}
		} catch (error) {
			setIsLoading(false);
			if (error.response) {
				toast.error(error.response.data.message);
				console.log(error.response.data.message);
			} else {
				toast.error("An unexpected error occurred");
				console.log(error);
			}
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className='flex min-h-screen'>
			{/* Signup Form Section */}
			<div className='w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-blue-100 to-blue-200'>
				<div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-lg lg:max-w-xl'>
					{isLoading && <Loader />}
					<div className='text-center mb-6'>
						<h1 className='text-4xl font-bold text-gray-800 mb-2'>Sign Up</h1>
						<p className='text-gray-600 text-lg'>Create a new account</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-medium mb-2'
								htmlFor='name'
							>
								Name
							</label>
							<input
								id='name'
								type='text'
								{...register("name", { required: "Name is required" })}
								className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
									errors.name ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors.name && (
								<p className='text-red-500 text-xs mt-1'>
									{errors.name.message}
								</p>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-medium mb-2'
								htmlFor='email'
							>
								Email
							</label>
							<input
								id='email'
								type='email'
								{...register("email", { required: "Email is required" })}
								className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
									errors.email ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors.email && (
								<p className='text-red-500 text-xs mt-1'>
									{errors.email.message}
								</p>
							)}
						</div>

						<div className='mb-6'>
							<label
								className='block text-gray-700 text-sm font-medium mb-2'
								htmlFor='password'
							>
								Password
							</label>
							<div className='relative'>
								<input
									id='password'
									type={showPassword ? "text" : "password"}
									{...register("password", {
										required: "Password is required",
									})}
									className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
										errors.password ? "border-red-500" : "border-gray-300"
									}`}
								/>
								<span
									onClick={handleClickShowPassword}
									className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
								>
									{showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
								</span>
							</div>
							{errors.password && (
								<p className='text-red-500 text-xs mt-1'>
									{errors.password.message}
								</p>
							)}
						</div>

						<button
							type='submit'
							className='w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
						>
							Sign Up
						</button>

						<p className='text-center text-gray-600 text-sm mt-4'>
							Already have an account?{" "}
							<Link to='/login' className='text-blue-500 hover:underline'>
								Log In
							</Link>
						</p>
					</form>
				</div>
			</div>
			{/* Image Section */}
			<div className='hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-200'>
				<div
					className='w-full h-full bg-cover bg-center rounded-l-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'
					style={{
						backgroundImage: "url(https://bit.ly/46TruON)",
					}}
				></div>
			</div>
		</div>
	);
}

export default Signup;
