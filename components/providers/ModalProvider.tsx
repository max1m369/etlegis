"use client";

import React from "react";
import { useConsultationModal as useZustandConsultationModal } from "@/lib/store/useConsultationModal";

export const useConsultationModal = () => {
  const store = useZustandConsultationModal();
  return {
    isOpen: store.isOpen,
    openModal: store.openModal,
    closeModal: store.closeModal,
    initialNote: store.contextTitle || "",
  };
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
