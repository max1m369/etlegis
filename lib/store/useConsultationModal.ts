import { create } from 'zustand';

interface ConsultationModalStore {
  isOpen: boolean;
  contextTitle?: string; // Например, передать "Консультация по уголовной практике"
  openModal: (contextTitle?: string) => void;
  closeModal: () => void;
}

export const useConsultationModal = create<ConsultationModalStore>((set) => ({
  isOpen: false,
  contextTitle: undefined,
  openModal: (contextTitle) => set({ isOpen: true, contextTitle }),
  closeModal: () => set({ isOpen: false, contextTitle: undefined }),
}));
