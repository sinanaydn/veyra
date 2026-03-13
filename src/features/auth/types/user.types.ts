export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  preferredLanguage: "tr" | "en";
  preferredCurrency: "TRY" | "EUR" | "USD";
}
