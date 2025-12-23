import { create } from "zustand";


interface useModalProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useLoginModal = create<useModalProps>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default useLoginModal;