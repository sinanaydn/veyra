import type { User, UserRole } from "./user.types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: string;
}

export type { User, UserRole };
