import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import Test from "./routes/Test";
import TestWindow from "./routes/TestWindow";
import Submit from "./routes/Submit";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import PermissionComponent from "./routes/PermissionComponent";

function App() {
	return (
		<>
			<Toaster position='top-center' reverseOrder={false} />
			<BrowserRouter>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route element={<PrivateRoute />}>
						<Route
							path='/'
							element={
								<>
									<Navbar />
									<Home />
									<Footer />
								</>
							}
						/>
						<Route
							path='/test'
							element={
								<>
									<Navbar />
									<Test />
									<Footer />
								</>
							}
						/>
						<Route
							path='/permissions/:id'
							element={
								<>
									<Navbar />
									<PermissionComponent />
									<Footer />
								</>
							}
						/>
						<Route path='/test/:id' element={<TestWindow />} />
						<Route path='/submit' element={<Submit />} />
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
