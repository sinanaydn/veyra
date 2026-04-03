import { authApi } from "@/lib/api/auth.api";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  Session,
} from "../types/auth.types";

const SESSION_KEY = "veyra_session";

function persistSession(session: Session): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}

function clearPersistedSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await authApi.login(payload);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    persistSession({ user: response.user, token: response.token, expiresAt });
    return response;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await authApi.register(payload);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    persistSession({ user: response.user, token: response.token, expiresAt });
    return response;
  },

  async resolveSession(): Promise<Session | null> {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    try {
      const session: Session = JSON.parse(raw);
      if (new Date(session.expiresAt) < new Date()) {
        clearPersistedSession();
        return null;
      }
      const user = await authApi.getMe();
      return { user, token: session.token, expiresAt: session.expiresAt };
    } catch {
      clearPersistedSession();
      return null;
    }
  },

  async logout(): Promise<void> {
    clearPersistedSession();
  },
};
