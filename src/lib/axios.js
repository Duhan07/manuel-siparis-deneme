import axios from "axios";

export const BranchAPI = axios.create({
  baseURL: import.meta.env.VITE_APP_BRANCH_API_URL,
});
console.log(import.meta.env.VITE_APP_BRANCH_API_URL)

console.log({BranchAPI})

export const BuildingsAPI = axios.create({
  baseURL: import.meta.env.VITE_APP_BUILDINGS_API_URL,
});
