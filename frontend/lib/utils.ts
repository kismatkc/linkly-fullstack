import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
// lib/authOptions.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Api = axios.create({
  // baseURL: "https://31e908fa-c906-497c-9c86-bb5450c92e73-00-3dkixqsx8vovm.kirk.repl.co:3000/api",
   baseURL: "https://backend.unfiltereddopamine.com/api",
  // baseURL: "http://localhost:4000/api", // Set your base URL
  withCredentials: true, // Include credentials (cookies) with requests
});
