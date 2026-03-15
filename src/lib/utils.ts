import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Simulate network latency for mock services. */
export const delay = (ms: number = 200) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
