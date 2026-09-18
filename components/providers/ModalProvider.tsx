"use client";

import React, { createContext, useContext, useState } from "react";
import ConsultationModal from "@/components/ui/ConsultationModal";

interface ModalContextType {
  isOpen: boolean;
  openModal: (initialNote?: string) => void;
  closeModal: () => void;
  initialNote: string;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  initialNote: "",
});

export const useConsultationModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialNote, setInitialNote] = useState("");

  const openModal = (note?: string) => {
    setInitialNote(note || "");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, initialNote }}>
      {children}
      <ConsultationModal />
    </ModalContext.Provider>
  );
}
