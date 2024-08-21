import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePermissionsStore from "../stores/permissionStore";
import { FaMicrophone } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";

function PermissionComponent() {
	const navigate = useNavigate();
	const { id } = useParams();
	const {
		cameraPermission,
		setCameraPermission,
		audioPermission,
		setAudioPermission,
	} = usePermissionsStore();
	const [cameraWorking, setCameraWorking] = useState(false);
	const [stream, setStream] = useState(null);
	const videoRef = useRef(null);

	useEffect(() => {
		navigator.mediaDevices.enumerateDevices().then((devices) => {
			const hasCamera = devices.some((device) => device.kind === "videoinput");
			if (hasCamera) {
				setCameraWorking(true);
			}
		});
	}, []);

	useEffect(() => {
		if (cameraPermission && videoRef.current) {
			navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
				setStream(stream);
				videoRef.current.srcObject = stream;
				videoRef.current.play();
			});
		}
		return () => {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
		};
	}, [cameraPermission]);

	useEffect(() => {
		if (cameraPermission && audioPermission) {
			navigate(`/test/${id}`);
		}
	}, [cameraPermission, audioPermission, navigate, id]);

	const requestCameraPermission = async () => {
		try {
			await navigator.mediaDevices.getUserMedia({ video: true });
			setCameraPermission(true);
		} catch (error) {
			setCameraPermission(false);
		}
	};

	const requestAudioPermission = async () => {
		try {
			await navigator.mediaDevices.getUserMedia({ audio: true });
			setAudioPermission(true);
		} catch (error) {
			setAudioPermission(false);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 border border-gray-300 rounded-lg shadow-2xl'>
			<h1 className='text-4xl font-bold text-gray-800 mb-8'>
				Grant Permissions
			</h1>
			<p className='text-lg text-gray-600 mb-4'>
				To proceed with the test, please grant the following permissions.
			</p>
			<div className='w-full max-w-md mb-8 flex flex-col items-center'>
				<button
					onClick={requestCameraPermission}
					className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md mb-4 transition-transform transform ${
						cameraPermission ? "bg-green-500" : "hover:bg-blue-600"
					}`}
				>
					<IoMdCamera className='inline mr-2' />
					Allow Camera
				</button>
				{cameraPermission && (
					<div className='relative w-64 h-64 border-4 border-blue-400 rounded-lg overflow-hidden shadow-md'>
						<video ref={videoRef} className='w-full h-full object-cover' />
						{cameraWorking && (
							<span className='absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-sm'>
								Camera is working
							</span>
						)}
					</div>
				)}
				<p className='text-gray-600 mt-2'>
					Your camera feed will appear here once permission is granted.
				</p>
			</div>
			<div className='w-full max-w-md mb-8 flex flex-col items-center'>
				<button
					onClick={requestAudioPermission}
					className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform ${
						audioPermission ? "bg-green-500" : "hover:bg-blue-600"
					}`}
				>
					<FaMicrophone className='inline mr-2' />
					Allow Audio
				</button>
				{audioPermission && (
					<span className='mt-2 text-green-500 text-xl'>
						<FaMicrophone />
					</span>
				)}
				<p className='text-gray-600 mt-2'>
					Audio permissions are necessary to proceed with the test.
				</p>
			</div>
		</div>
	);
}

export default PermissionComponent;
