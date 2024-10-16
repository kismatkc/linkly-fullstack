import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
// lib/authOptions.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Api = axios.create({
  baseURL: "http://localhost:4000/api", // Set your base URL
  withCredentials: true, // Include credentials (cookies) with requests
});
