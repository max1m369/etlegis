"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const { openModal } = useConsultationModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      // Default action for boutique CTAs is opening the consultation modal
      openModal();
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-[2px] tracking-wider uppercase cursor-pointer";
  
  const variantStyles = {
    primary: "bg-[#141517] hover:bg-[#1E293B] text-white shadow-subtle",
    outline: "bg-transparent border border-[#E2E2DC] text-[#141517] hover:border-[#141517] hover:bg-[#141517] hover:text-white",
    secondary: "bg-[#F8F9FA] border border-[#ECECE8] text-[#141517] hover:border-[#141517]",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
