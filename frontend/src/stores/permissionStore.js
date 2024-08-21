// stores/permissionsStore.js
import create from "zustand";

const usePermissionsStore = create((set) => ({
	cameraPermission: false,
	audioPermission: false,
	setCameraPermission: (value) => set({ cameraPermission: value }),
	setAudioPermission: (value) => set({ audioPermission: value }),
}));

export default usePermissionsStore;
