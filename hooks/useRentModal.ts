import { create } from "zustand";

interface useRentModalProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void
}

export const useRentModal = create<useRentModalProps>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))