import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRuPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  
  // Format as +7 (XXX) XXX-XX-XX
  let result = "+7";
  const numPart = digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;
  
  if (numPart.length > 0) {
    result += " (" + numPart.substring(0, 3);
  }
  if (numPart.length >= 4) {
    result += ") " + numPart.substring(3, 6);
  }
  if (numPart.length >= 7) {
    result += "-" + numPart.substring(6, 8);
  }
  if (numPart.length >= 9) {
    result += "-" + numPart.substring(8, 10);
  }
  return result;
}

export function isValidRuPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}
