import { apiClient } from "./client";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  Session,
} from "@/features/auth/types/auth.types";

export const authApi = {
  login: (payload: LoginPayload): Promise<AuthResponse> =>
    apiClient.post("/auth/login", payload).then((r) => r.data),

  register: (payload: RegisterPayload): Promise<AuthResponse> =>
    apiClient.post("/auth/register", payload).then((r) => r.data),

  getMe: (): Promise<Session["user"]> =>
    apiClient.get("/users/me").then((r) => r.data),
};
