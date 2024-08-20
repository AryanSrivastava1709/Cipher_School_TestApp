import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

const useTestStore = create(
	persist(
		(set) => ({
			tests: [],
			currentTest: null,
			isLoading: false,

			fetchTests: async () => {
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
				console.log(data);
				set({ tests: data, isLoading: false });
			},
			fetchTestById: async (testId) => {
				set({ isLoading: true });
				const response = await fetch(`/api/tests/${testId}`);
				const data = await response.json();
				set({ currentTest: data, isLoading: false });
			},
			setCurrentTest: (test) => set({ currentTest: test }),
			addTest: (test) => set((state) => ({ tests: [...state.tests, test] })),
			updateTest: (updatedTest) =>
				set((state) => ({
					tests: state.tests.map((test) =>
						test._id === updatedTest._id ? updatedTest : test
					),
				})),
			deleteTest: (testId) =>
				set((state) => ({
					tests: state.tests.filter((test) => test._id !== testId),
				})),
		}),
		{
			name: "test-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useTestStore;
