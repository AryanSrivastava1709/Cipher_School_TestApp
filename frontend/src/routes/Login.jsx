import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import Loader from "../components/Loader";

function Login() {
	const navigate = useNavigate();
	const { login, isLoading } = useUserStore(); // Destructure isLoading from the store

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async (data, e) => {
		e.preventDefault();
		const userData = {
			email: data.email,
			password: data.password,
		};
		await login(userData);
		navigate("/");
	};

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className='relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300'>
			{isLoading && <Loader />}
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-2xl font-semibold text-gray-800 mb-6'>Login</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
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
							className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
								{...register("password", { required: "Password is required" })}
								className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
						className='w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						Log In
					</button>

					<p className='text-center text-gray-600 text-sm mt-4'>
						Don't have an account?{" "}
						<Link to='/signup' className='text-blue-600 hover:underline'>
							Sign Up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
