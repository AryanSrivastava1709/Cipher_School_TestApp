import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/userStore";

function PrivateRoute() {
	const { isAuthenticated } = useUserStore();

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;
