import {create} from 'zustand';


const useModalStore = create((set) => ({
  isAuth: false,
  openModal: () => set({ isAuth: true }),
  closeModal: () => set({ isAuth: false }),
}));

export default useModalStore;