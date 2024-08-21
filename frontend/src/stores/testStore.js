import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const useTestStore = create(
	persist(
		(set) => ({
			tests: [],
			currentTest: null,
			isLoading: false,

			// Fetch all tests
			fetchTests: async () => {
				try {
					set({ isLoading: true });
					const response = await axios.get(
						"https://quiz-app-api-seven.vercel.app/api/test",
						{
							headers: {
								Authorization: `Bearer ${Cookies.get("token")}`,
							},
						}
					);
					const data = await response.data.tests;
					set({ tests: data, isLoading: false });
					toast.success("Tests fetched successfully");
				} catch (error) {
					set({ isLoading: false });
					if (error.response) {
						toast.error(error.response.data.message);
					} else {
						toast.error("An unexpected error occurred");
					}
				}
			},

			// Fetch a test by ID
			fetchTestById: async (testId) => {
				try {
					set({ isLoading: true });
					const response = await axios.get(
						`https://quiz-app-api-seven.vercel.app/api/test/${testId}`,
						{
							headers: {
								Authorization: `Bearer ${Cookies.get("token")}`,
							},
						}
					);
					const data = await response.data;
					set({ currentTest: data, isLoading: false });
					toast.success("Test fetched successfully");
				} catch (error) {
					set({ isLoading: false });
					if (error.response) {
						toast.error(error.response.data.message);
					} else {
						toast.error("An unexpected error occurred");
					}
				}
			},

			// Submit the test
			submitTest: async (submissionData) => {
				try {
					set({ isLoading: true });
					const response = await axios.post(
						"https://quiz-app-api-seven.vercel.app/api/submission",
						submissionData,
						{
							headers: {
								Authorization: `Bearer ${Cookies.get("token")}`,
							},
						}
					);
					set({ isLoading: false });
					const data = await response.data;
					console.log(data);
				} catch (error) {
					set({ isLoading: false });
					if (error.response) {
						toast.error(error.response.data.message);
					} else {
						toast.error("An unexpected error occurred");
					}
				}
			},

			// Setters
			setTests: (tests) => set({ tests }),

			// Set the current test
			setCurrentTest: (test) => set({ currentTest: test }),
		}),
		{
			name: "test-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useTestStore;
