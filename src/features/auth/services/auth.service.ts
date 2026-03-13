import { mockUsers } from "@/lib/mocks/users";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  Session,
} from "../types/auth.types";
import type { User } from "../types/user.types";

const delay = (ms: number = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_TOKEN = "veyra_mock_token_2026";
const SESSION_KEY = "veyra_session";

function createSession(user: User): Session {
  const expiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  ).toISOString();
  return { user, token: MOCK_TOKEN, expiresAt };
}

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
  /**
   * Mock login — email ile kullanıcı eşleştirilir.
   * Demo giriş: admin@veyra.com.tr / elif.demir@email.com
   * Herhangi bir şifre kabul edilir (mock).
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    await delay();

    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (!user) {
      throw new Error("E-posta adresi veya şifre hatalı.");
    }

    const session = createSession(user);
    persistSession(session);

    return { user, token: MOCK_TOKEN };
  },

  /**
   * Mock register — yeni kullanıcı oluşturulur (bellekte).
   * E-posta çakışması kontrol edilir.
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    await delay();

    const exists = mockUsers.some(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (exists) {
      throw new Error("Bu e-posta adresi zaten kayıtlı.");
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      role: "USER",
      preferredLanguage: "tr",
      preferredCurrency: "TRY",
    };

    const session = createSession(newUser);
    persistSession(session);

    return { user: newUser, token: MOCK_TOKEN };
  },

  /**
   * Mevcut session'ı localStorage'dan yükler.
   * Gerçek API'de bu /me veya /auth/session endpoint'i olacak.
   */
  async resolveSession(): Promise<Session | null> {
    await delay(100);

    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    try {
      const session: Session = JSON.parse(raw);
      if (new Date(session.expiresAt) < new Date()) {
        clearPersistedSession();
        return null;
      }
      return session;
    } catch {
      clearPersistedSession();
      return null;
    }
  },

  async logout(): Promise<void> {
    await delay(100);
    clearPersistedSession();
  },
};
