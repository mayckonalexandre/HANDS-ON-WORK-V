import axios from "axios";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./auth";

export const api = axios.create({
  baseURL: "http://localhost/api",
});

api.interceptors.request.use(async (config) => {
  const session = await getServerSession(nextAuthOptions);

  if (session?.token) config.headers.Authorization = `Bearer ${session.token}`;

  return config;
});
