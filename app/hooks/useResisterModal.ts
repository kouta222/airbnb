import { create } from "zustand";

interface ResisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useResisterModal = create<ResisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useResisterModal;
