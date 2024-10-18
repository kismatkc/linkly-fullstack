import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
// lib/authOptions.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Ambient(environment: string | undefined) {
  let apiOptions = {
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
  };
  if (environment === "replit") {
    apiOptions.baseURL =
      "https://31e908fa-c906-497c-9c86-bb5450c92e73-00-3dkixqsx8vovm.kirk.repl.co:3000/api";
  }

  if (environment === "production") {
    apiOptions.baseURL = "https://backend.unfiltereddopamine.com/api";
  }
  return apiOptions;
}
export const Api = axios.create(Ambient(process.env.NEXT_PUBLIC_ENV));
