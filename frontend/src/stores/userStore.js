import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const useUserStore = create(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			isAdmin: false,
			isLoading: false,

			// This function is used to login the user
			login: async (userData) => {
				try {
					set({ isLoading: true });
					const res = await axios.post(
						"https://quiz-app-api-seven.vercel.app/api/auth/login",
						userData
					);
					if (res.status === 200) {
						const { user, token } = res.data;
						set({
							user,
							isAuthenticated: true,
							isAdmin: user.role === "admin",
							isLoading: false,
						});
						// Calculate the expiration time for 10 hours
						const expires = new Date();
						expires.setHours(expires.getHours() + 10);

						// Set the cookie to expire in 10 hours
						Cookies.set("token", token, { expires });
						toast.success(`Welcome back ${user.name}`);
					}
				} catch (error) {
					set({ isLoading: false });
					if (error.response) {
						toast.error(error.response.data.message);
						console.log(error.response.data.message);
					} else {
						toast.error("An unexpected error occurred");
						console.log(error);
					}
				}
			},

			// This function is used to logout the user
			logout: () => {
				set({ user: null, isAuthenticated: false, isAdmin: false });
				Cookies.remove("token");
			},
		}),

		{
			name: "user-storage", // unique name for the store in localStorage
			getStorage: () => localStorage, // specify localStorage
		}
	)
);

export default useUserStore;
