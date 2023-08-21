import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fakeInsert = (delay: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay)
  })
}