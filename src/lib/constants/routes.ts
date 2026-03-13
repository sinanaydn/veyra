export const ROUTES = {
  // Public
  HOME: "/",
  FLEET: "/fleet",
  CAR_DETAIL: (slug: string) => `/fleet/${slug}`,
  BOOKING: "/booking",
  BOOKING_PAYMENT: "/booking/payment",
  BOOKING_CONFIRMATION: "/booking/confirmation",
  ABOUT: "/about",
  FAQ: "/faq",
  CONTACT: "/contact",
  BLOG: "/blog",
  BLOG_POST: (slug: string) => `/blog/${slug}`,

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // Account
  ACCOUNT: "/account",
  ACCOUNT_RESERVATIONS: "/account/reservations",
  ACCOUNT_PROFILE: "/account/profile",

  // Admin
  ADMIN: "/admin",
  ADMIN_CARS: "/admin/cars",
  ADMIN_BRANDS: "/admin/brands",
  ADMIN_MODELS: "/admin/models",
  ADMIN_RESERVATIONS: "/admin/reservations",
  ADMIN_USERS: "/admin/users",
  ADMIN_CONTENT: "/admin/content",
  ADMIN_FAQ: "/admin/faq",
  ADMIN_BLOG: "/admin/blog",
  ADMIN_REVIEWS: "/admin/reviews",
  ADMIN_SETTINGS: "/admin/settings",
} as const;
