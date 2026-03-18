# VEYRA — Frontend Proje Referans Dosyası

> Bu dosya, Veyra frontend projesinin tamamını A-Z tanımlayan tek kaynak belgedir.
> Backend geliştiren AI veya geliştirici bu dosyayı okuyarak frontend ile tam uyumlu API yazabilir.
> Her yeni session'da projeyi sıfırdan öğrenmek yerine bu dosya okunmalıdır.

---

## 1. PROJE ÖZETI

**Proje:** Veyra — Türkiye pazarı için premium araç kiralama platformu
**Dizin:** `C:\rentacar-UI\veyra\`
**Durum:** Frontend prototype tamamlandı (mock data ile çalışıyor). Backend entegrasyonu bekliyor.
**Dil:** Türkçe (varsayılan), İngilizce (hazırlık aşamasında)

### Tech Stack

| Teknoloji | Versiyon | Amaç |
|-----------|----------|------|
| Next.js | 16.1.6 | App Router, SSR/SSG framework |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Tip güvenliği |
| Tailwind CSS | ^4 | Utility-first CSS (inline theme, globals.css) |s
| shadcn/ui | 4.0.6 | UI component library (base-nova style, **base-ui tabanlı, Radix DEĞİL**) |
| @base-ui/react | 1.3.0 | shadcn v4'ün temel primitive'leri |
| Zustand | 5.0.11 | Client state management (auth, booking, ui) |
| TanStack Query | 5.90.21 | Server state, caching, mutations |
| React Hook Form | 7.71.2 | Form state management |
| Zod | 4.3.6 | Schema validation |
| next-themes | 0.4.6 | Dark/light mode (class-based) |
| sonner | 2.0.7 | Toast notifications |
| recharts | 3.8.0 | Admin dashboard grafikleri |
| motion | 12.36.0 | Animasyonlar (framer-motion yerine) |
| lucide-react | 0.577.0 | Icon library |
| date-fns | 4.1.0 | Tarih formatlama (tr/en locale) |
| next-intl | 4.8.3 | i18n (kurulu ama route-based değil henüz) |
| cmdk | 1.1.1 | Command palette |
| vaul | 1.1.2 | Drawer component |
| react-day-picker | 9.14.0 | Takvim date picker |

---

## 2. KLASÖR YAPISI

```
veyra/
├── public/images/                     Statik görseller (car-placeholder.svg)
├── src/
│   ├── app/
│   │   ├── layout.tsx                 Root layout (providers, fonts)
│   │   ├── globals.css                Tema tokenları (oklch, dark mode)
│   │   ├── (public)/                  Public route grubu
│   │   │   ├── layout.tsx             Header + Footer wrapper
│   │   │   ├── page.tsx               Ana sayfa (hero, featured, reviews...)
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── blog/[slug]/page.tsx
│   │   │   ├── fleet/page.tsx         Araç listeleme (filtre, sıralama)
│   │   │   ├── fleet/[slug]/page.tsx  Araç detay
│   │   │   └── booking/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx           Booking özet (insurance, extras, driver)
│   │   │       ├── payment/page.tsx   Ödeme formu
│   │   │       └── confirmation/page.tsx  Onay sayfası
│   │   ├── (auth)/                    Auth route grubu (GuestGuard)
│   │   │   ├── layout.tsx             Centered form layout
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (account)/                 Account route grubu (AuthGuard)
│   │   │   ├── layout.tsx             Header + Sidebar nav
│   │   │   └── account/
│   │   │       ├── page.tsx           Hesap özeti
│   │   │       ├── profile/page.tsx   Profil düzenle
│   │   │       └── reservations/page.tsx  Rezervasyonlarım
│   │   └── (admin)/                   Admin route grubu (AdminGuard)
│   │       ├── layout.tsx             Sidebar + Topbar
│   │       └── admin/
│   │           ├── page.tsx           Dashboard (KPI, chart)
│   │           ├── cars/page.tsx      Araç CRUD
│   │           ├── brands/page.tsx    Marka CRUD
│   │           ├── models/page.tsx    Model CRUD
│   │           ├── reservations/page.tsx  Rezervasyon yönetimi
│   │           ├── users/page.tsx     Kullanıcı yönetimi
│   │           ├── blog/page.tsx      [placeholder]
│   │           ├── faq/page.tsx       [placeholder]
│   │           ├── reviews/page.tsx   [placeholder]
│   │           ├── content/page.tsx   [placeholder]
│   │           └── settings/page.tsx  [placeholder]
│   ├── components/
│   │   ├── ui/                26 shadcn component (button, card, table, dialog, sheet...)
│   │   ├── layout/            header, footer, logo, admin-sidebar, admin-topbar, account-nav
│   │   ├── marketing/         hero-section, featured-fleet, why-veyra, reviews-section, how-it-works, city-preview, final-cta, trust-strip, service-blocks
│   │   ├── auth/              auth-card, auth-error, password-input, demo-credentials
│   │   ├── fleet/             fleet-shell, fleet-filters, fleet-sort-bar, fleet-car-card, car-card, mobile-filters, active-filters-strip, fleet-loading
│   │   ├── car-detail/        car-detail-shell, car-gallery, car-features, spec-badges, insurance-packages, extras-block, rental-conditions, booking-summary, related-cars, detail-loading, detail-not-found
│   │   ├── booking/           booking-widget, booking-stepper, booking-car-summary, driver-form, insurance-selector, extras-selector, payment-form, price-breakdown, confirmation-card
│   │   ├── account/           profile-form, password-form, reservation-card, stat-card
│   │   ├── admin/             kpi-card, admin-section, quick-actions, recent-reservations-table, status-distribution, city-performance, fleet-availability, activity-feed, car-form, car-form-sheet, brand-form-sheet, model-form-sheet, delete-car-dialog, delete-brand-dialog, delete-model-dialog, reservation-detail-sheet, user-detail-sheet
│   │   ├── shared/            empty-state, loading-state, status-badge, section-heading, theme-toggle, language-switcher, currency-switcher
│   │   └── providers/         theme-provider, query-provider, auth-provider
│   ├── features/              Domain-driven feature modülleri (aşağıda detaylı)
│   │   ├── auth/              types/, schemas/, services/, hooks/
│   │   ├── cars/              types/, services/, hooks/
│   │   ├── brands/            types/, services/, hooks/
│   │   ├── models/            types/, services/, hooks/
│   │   ├── rentals/           types/, services/, hooks/
│   │   ├── locations/         types/, services/, hooks/
│   │   ├── reviews/           types/, services/, hooks/
│   │   ├── blog/              types/, services/, hooks/
│   │   ├── faq/               types/, services/, hooks/
│   │   ├── booking/           schemas/
│   │   ├── dashboard/         services/, hooks/
│   │   └── users/             services/, hooks/
│   └── lib/
│       ├── api/               [BOŞ — backend entegrasyonu için hazır]
│       ├── constants/         routes.ts, config.ts
│       ├── guards/            auth-guard.tsx, admin-guard.tsx, guest-guard.tsx
│       ├── mocks/             users, cars, brands, models, locations, reservations, blog, faq, reviews
│       ├── store/             auth.store.ts, booking.store.ts, ui.store.ts
│       ├── utils/             format.ts (formatCurrency, formatDate, formatDateRelative)
│       └── utils.ts           cn() (clsx+twMerge), delay() (mock latency)
```

---

## 3. ROUTE HARİTASI

| Route | Grup | Guard | Açıklama |
|-------|------|-------|----------|
| `/` | public | — | Ana sayfa |
| `/fleet` | public | — | Araç listeleme (filtre + sıralama) |
| `/fleet/[slug]` | public | — | Araç detay sayfası |
| `/booking` | public | — | Booking özet (insurance, extras, driver form) |
| `/booking/payment` | public | — | Ödeme formu |
| `/booking/confirmation` | public | — | Rezervasyon onayı |
| `/about` | public | — | Hakkımızda |
| `/contact` | public | — | İletişim |
| `/faq` | public | — | SSS |
| `/blog` | public | — | Blog listesi |
| `/blog/[slug]` | public | — | Blog yazısı detay |
| `/login` | auth | GuestGuard | Giriş formu |
| `/register` | auth | GuestGuard | Kayıt formu |
| `/account` | account | AuthGuard | Hesap özeti |
| `/account/reservations` | account | AuthGuard | Rezervasyonlarım |
| `/account/profile` | account | AuthGuard | Profil düzenle |
| `/admin` | admin | AdminGuard | Dashboard (KPI, chart) |
| `/admin/cars` | admin | AdminGuard | Araç CRUD |
| `/admin/brands` | admin | AdminGuard | Marka CRUD |
| `/admin/models` | admin | AdminGuard | Model CRUD |
| `/admin/reservations` | admin | AdminGuard | Rezervasyon yönetimi |
| `/admin/users` | admin | AdminGuard | Kullanıcı yönetimi |
| `/admin/blog` | admin | AdminGuard | [placeholder — yakında] |
| `/admin/faq` | admin | AdminGuard | [placeholder — yakında] |
| `/admin/reviews` | admin | AdminGuard | [placeholder — yakında] |
| `/admin/content` | admin | AdminGuard | [placeholder — yakında] |
| `/admin/settings` | admin | AdminGuard | [placeholder — yakında] |

---

## 4. TEMA & DESIGN SYSTEM

### Renk Tokenları (oklch)

**Light Mode (`:root`)**
```
--background:         oklch(0.975 0.005 85)    /* sıcak krem */
--foreground:         oklch(0.195 0.01 260)    /* derin lacivert */
--primary:            oklch(0.285 0.065 260)   /* marka lacivert */
--primary-foreground: oklch(0.98 0.003 85)
--secondary:          oklch(0.945 0.008 80)    /* yumuşak taş */
--muted:              oklch(0.955 0.006 80)
--muted-foreground:   oklch(0.48 0.01 260)
--accent:             oklch(0.935 0.012 75)    /* şampanya nötr */
--card:               oklch(0.993 0.003 85)    /* beyaza yakın */
--border:             oklch(0.905 0.008 80)    /* taş gri */
--destructive:        oklch(0.53 0.19 25)      /* kırmızı */
--success:            oklch(0.52 0.14 155)     /* yeşil */
--warning:            oklch(0.72 0.14 70)      /* amber */
```

**Dark Mode (`.dark`)**
```
--background:         oklch(0.155 0.015 260)   /* çok koyu lacivert */
--foreground:         oklch(0.93 0.005 85)     /* beyaza yakın */
--primary:            oklch(0.78 0.06 260)     /* parlak açık mavi */
--card:               oklch(0.21 0.018 260)    /* bg'den +0.06 açık */
--border:             oklch(0.31 0.015 260)    /* güçlü border */
--muted-foreground:   oklch(0.66 0.01 260)     /* okunur metin */
```

### Fontlar
- **Inter** → body text, UI (varsayılan sans-serif)
- **Manrope** → h1-h6 başlıklar
- **Geist Mono** → monospace
- Yükleme: `next/font/google`, `display: "swap"`, `latin + latin-ext`

### Dark Mode Stratejisi
- `@custom-variant dark (&:is(.dark *))` — Tailwind 4 custom variant
- `next-themes` ile class-based switching
- localStorage key: `"theme"`

### Radius
```
--radius: 0.625rem (base)
sm: 0.375rem, md: 0.5rem, lg: 0.625rem, xl: 0.875rem, 2xl: 1.125rem
```

---

## 5. TYPESCRIPT TYPE TANIMLARI (TAM)

### 5.1 User & Auth Types

```typescript
// features/auth/types/user.types.ts
type UserRole = "ADMIN" | "USER";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  preferredLanguage: "tr" | "en";
  preferredCurrency: "TRY" | "EUR" | "USD";
}

// features/auth/types/auth.types.ts
interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface Session {
  user: User;
  token: string;
  expiresAt: string;   // ISO 8601
}
```

### 5.2 Car Types

```typescript
// features/cars/types/car.types.ts
type Transmission = "AUTOMATIC" | "MANUAL";
type FuelType = "GASOLINE" | "DIESEL" | "HYBRID" | "ELECTRIC";
type FuelPolicy = "FULL_TO_FULL" | "SAME_TO_SAME" | "PRE_PURCHASE";
type AvailabilityStatus = "AVAILABLE" | "RESERVED" | "MAINTENANCE";

interface InsurancePackage {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  coverageItems: string[];      // ["Kasko", "Cam Sigortası", ...]
}

interface ExtraService {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  priceType: "PER_DAY" | "ONE_TIME";
}

interface Car {
  id: string;
  slug: string;                 // URL-safe unique: "mercedes-s-serisi-2024"
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  year: number;
  category: CarCategory;        // ECONOMY | SEDAN | SUV | EXECUTIVE | VIP
  city: string;                 // "İstanbul", "Ankara", "İzmir"...
  pickupLocations: string[];    // ["İstanbul Havalimanı", "Kadıköy Ofis"]
  returnLocations: string[];
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;                // 5, 7
  baggage: number;              // 2, 3, 4
  doors: number;                // 4, 5
  imageUrls: string[];          // DİZİ — birden fazla resim
  pricePerDay: number;          // TRY cinsinden
  depositAmount: number;
  mileageLimit: number;         // km/gün
  fuelPolicy: FuelPolicy;
  availability: AvailabilityStatus;
  airportEligible: boolean;
  description: string;
  features: string[];           // ["Apple CarPlay", "Deri Koltuk", ...]
  insurancePackages: InsurancePackage[];  // Car'ın İÇİNDE
  extras: ExtraService[];                // Car'ın İÇİNDE
  rating: number;               // 0-5 arası
  reviewCount: number;
}

interface CarFilters {
  city?: string;
  brandId?: string;
  modelId?: string;
  transmission?: Transmission;
  fuelType?: FuelType;
  category?: CarCategory;
  minSeats?: number;
  minBaggage?: number;
  minPrice?: number;
  maxPrice?: number;
  airportEligible?: boolean;
  availability?: AvailabilityStatus;
}

type CarSortOption = "RECOMMENDED" | "PRICE_ASC" | "PRICE_DESC" | "NEWEST" | "PREMIUM_FIRST";
```

### 5.3 Brand & Model Types

```typescript
// features/brands/types/brand.types.ts
interface Brand {
  id: string;
  name: string;
  slug: string;         // "bmw", "mercedes-benz"
  logoUrl?: string;
}

// features/models/types/model.types.ts
type CarCategory = "ECONOMY" | "SEDAN" | "SUV" | "EXECUTIVE" | "VIP";

interface CarModel {
  id: string;
  brandId: string;
  name: string;
  category: CarCategory;
}
```

### 5.4 Rental/Reservation Types

```typescript
// features/rentals/types/rental.types.ts
type ReservationStatus = "PENDING" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED";

interface Reservation {
  id: string;
  reservationCode: string;       // "VYR-ABC123"
  carId: string;
  userId: string;
  status: ReservationStatus;
  pickupLocation: string;
  pickupDateTime: string;        // ISO 8601
  returnLocation: string;
  returnDateTime: string;        // ISO 8601
  days: number;
  subtotal: number;              // araç ücreti
  deposit: number;               // depozito
  extrasTotal: number;           // ek hizmetler
  grandTotal: number;            // toplam (deposit hariç)
  createdAt: string;             // ISO 8601
  carBrandName?: string;
  carModelName?: string;
  carImageUrl?: string;
}

// Service'te tanımlı extended type
interface AdminReservation extends Reservation {
  userName: string;
  userEmail: string;
}
```

### 5.5 Location Types

```typescript
// features/locations/types/location.types.ts
type LocationType = "OFFICE" | "AIRPORT";

interface Location {
  id: string;
  city: string;
  label: string;         // "İstanbul Havalimanı", "Kadıköy Ofis"
  type: LocationType;
  address: string;
  phone: string;
}
```

### 5.6 Review Types

```typescript
// features/reviews/types/review.types.ts
interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;         // 1-5
  comment: string;
  vehicle: string;        // "BMW 3 Serisi"
  date: string;           // ISO 8601
}
```

### 5.7 Blog Types

```typescript
// features/blog/types/blog.types.ts
type BlogCategory = "CITY_GUIDE" | "RENTAL_TIPS" | "AIRPORT_TRANSPORT" | "BUSINESS_TRAVEL" | "SEGMENT_COMPARISON";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;        // HTML veya markdown
  category: BlogCategory;
  coverImage: string;
  publishedAt: string;    // ISO 8601
}
```

### 5.8 FAQ Types

```typescript
// features/faq/types/faq.types.ts
type FAQCategory = "BOOKING" | "PAYMENT" | "DEPOSIT" | "INSURANCE" | "AIRPORT" | "CANCELLATION" | "MILEAGE" | "DOCUMENTS";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}
```

### 5.9 Dashboard Types

```typescript
// features/dashboard/services/dashboard.service.ts içinde tanımlı
interface DashboardKPIs {
  totalReservations: number;
  activeReservations: number;
  totalRevenue: number;
  totalCars: number;
  totalUsers: number;
  pendingReservations: number;
}

interface StatusDistribution {
  status: ReservationStatus;
  label: string;            // "Beklemede", "Onaylandı", "Aktif"...
  count: number;
  percentage: number;
}

interface FleetAvailability {
  status: AvailabilityStatus;
  label: string;            // "Müsait", "Rezerveli", "Bakımda"
  count: number;
}

interface CityPerformance {
  city: string;
  carCount: number;
  reservationCount: number;
}

interface RecentActivity {
  id: string;
  type: "reservation" | "user";
  title: string;
  subtitle: string;
  timestamp: string;       // ISO 8601
}
```

### 5.10 Booking Types

```typescript
// features/booking/schemas/booking.schemas.ts
interface DriverFormValues {
  firstName: string;       // min 2 karakter
  lastName: string;        // min 2 karakter
  email: string;           // email format
  phone: string;           // regex: /^\+?[0-9\s\-()]{10,15}$/
  nationality: string;     // zorunlu
  notes?: string;          // opsiyonel
}

interface PaymentFormValues {
  cardHolder: string;      // zorunlu
  cardNumber: string;      // regex: /^[0-9\s]{16,19}$/
  expiry: string;          // regex: /^(0[1-9]|1[0-2])\/[0-9]{2}$/ (AA/YY)
  cvv: string;             // regex: /^[0-9]{3,4}$/
  acceptTerms: boolean;    // true olmalı
}

// lib/store/booking.store.ts
type BookingStep = "summary" | "payment" | "confirmation";

interface BookingDates {
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
}

interface BookingLocation {
  id: string;
  label: string;
}

interface BookingResult {
  reservationId: string;
  reservationCode: string;
  createdAt: string;
}

interface PriceLine {
  label: string;
  amount: number;
  type: "base" | "insurance" | "extra" | "deposit" | "total";
}
```

### 5.11 Users Feature Types

```typescript
// features/users/services/users.service.ts içinde tanımlı
interface AdminUser extends User {
  reservationCount: number;
  totalSpent: number;
}
```

---

## 6. SERVICE CONTRACT'LARI (TAM)

Frontend'in beklediği service fonksiyonları. Backend API bu imzalara uyumlu response döndürmelidir.

### 6.1 authService
```typescript
login(payload: LoginPayload): Promise<AuthResponse>
register(payload: RegisterPayload): Promise<AuthResponse>
resolveSession(): Promise<Session | null>
logout(): Promise<void>
```

### 6.2 carsService
```typescript
getAll(filters?: CarFilters, sort?: CarSortOption): Promise<Car[]>
getBySlug(slug: string): Promise<Car | null>
getById(id: string): Promise<Car | null>
getFeatured(limit?: number = 4): Promise<Car[]>
getSimilar(carId: string, limit?: number = 3): Promise<Car[]>
create(data: Omit<Car, "id" | "slug">): Promise<Car>
update(id: string, data: Partial<Car>): Promise<Car>
remove(id: string): Promise<void>
```

### 6.3 brandsService
```typescript
getAll(): Promise<Brand[]>
getAllWithStats(): Promise<BrandWithStats[]>    // { ...Brand, modelCount, carCount }
getById(id: string): Promise<Brand | null>
create(data: Omit<Brand, "id">): Promise<Brand>
update(id: string, data: Partial<Brand>): Promise<Brand>
remove(id: string): Promise<void>
```

### 6.4 modelsService
```typescript
getAll(): Promise<CarModel[]>
getAllWithStats(): Promise<CarModelWithStats[]>  // { ...CarModel, brandName, carCount }
getByBrandId(brandId: string): Promise<CarModel[]>
getById(id: string): Promise<CarModel | null>
create(data: Omit<CarModel, "id">): Promise<CarModel>
update(id: string, data: Partial<CarModel>): Promise<CarModel>
remove(id: string): Promise<void>
```

### 6.5 rentalsService
```typescript
getAll(): Promise<Reservation[]>
getByUserId(userId: string): Promise<Reservation[]>
getById(id: string): Promise<Reservation | null>
getByStatus(status: ReservationStatus): Promise<Reservation[]>
getRecent(limit?: number = 5): Promise<Reservation[]>
getUpcoming(userId: string): Promise<Reservation[]>
getUserStats(userId: string): Promise<{ total: number; active: number; completed: number; totalSpent: number }>
getAllForAdmin(): Promise<AdminReservation[]>
updateStatus(id: string, status: ReservationStatus): Promise<Reservation>
getStats(): Promise<{ total: number; pending: number; confirmed: number; active: number; completed: number; cancelled: number; totalRevenue: number }>
```

### 6.6 usersService
```typescript
getAllWithStats(): Promise<AdminUser[]>
getById(id: string): Promise<AdminUser | null>
getUserReservations(userId: string): Promise<Reservation[]>
```

### 6.7 dashboardService
```typescript
getKPIs(): Promise<DashboardKPIs>
getStatusDistribution(): Promise<StatusDistribution[]>
getFleetAvailability(): Promise<FleetAvailability[]>
getCityPerformance(): Promise<CityPerformance[]>
getRecentReservations(): Promise<Reservation[]>
getRecentActivity(): Promise<RecentActivity[]>
```

### 6.8 locationsService
```typescript
getAll(): Promise<Location[]>
getByCity(city: string): Promise<Location[]>
getByType(type: LocationType): Promise<Location[]>
getCities(): Promise<string[]>
getById(id: string): Promise<Location | null>
```

### 6.9 blogService
```typescript
getAll(): Promise<BlogPost[]>
getBySlug(slug: string): Promise<BlogPost | null>
getRecent(limit?: number = 3): Promise<BlogPost[]>
```

### 6.10 reviewsService
```typescript
getAll(): Promise<Review[]>
getRecent(limit?: number = 4): Promise<Review[]>
```

### 6.11 faqService
```typescript
getAll(): Promise<FAQItem[]>
getByCategory(category: FAQCategory): Promise<FAQItem[]>
```

---

## 7. TANSTACK QUERY HOOK'LARI & KEY PATTERN'LERİ

### Query Key Convention
```typescript
const carKeys = {
  all: ["cars"] as const,
  list: (filters?, sort?) => ["cars", "list", filters, sort] as const,
  detail: (slug) => ["cars", "detail", slug] as const,
  featured: (limit?) => ["cars", "featured", limit] as const,
  similar: (carId) => ["cars", "similar", carId] as const,
};
```
Aynı pattern tüm feature'larda: `["brands"]`, `["models"]`, `["rentals"]`, `["dashboard", "kpis"]`, vb.

### Mutation Pattern
```typescript
export function useCreateCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => carsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: carKeys.all });
    },
  });
}
```

### QueryClient Config
```typescript
defaultOptions: {
  queries: {
    staleTime: 60 * 1000,           // 60 saniye
    refetchOnWindowFocus: false,
  },
}
```

### Tüm Hook'lar

| Feature | Hook | Service Call |
|---------|------|--------------|
| cars | `useCars(filters?, sort?)` | `carsService.getAll()` |
| cars | `useCarBySlug(slug)` | `carsService.getBySlug()` |
| cars | `useFeaturedCars(limit?)` | `carsService.getFeatured()` |
| cars | `useSimilarCars(carId)` | `carsService.getSimilar()` |
| cars | `useCreateCar()` | mutation → `carsService.create()` |
| cars | `useUpdateCar()` | mutation → `carsService.update()` |
| cars | `useDeleteCar()` | mutation → `carsService.remove()` |
| cars | `useFleetFilters()` | local state (filter/sort management) |
| brands | `useBrands()` | `brandsService.getAll()` |
| brands | `useBrandsWithStats()` | `brandsService.getAllWithStats()` |
| brands | `useCreateBrand()` | mutation |
| brands | `useUpdateBrand()` | mutation |
| brands | `useDeleteBrand()` | mutation |
| models | `useModels()` | `modelsService.getAll()` |
| models | `useModelsWithStats()` | `modelsService.getAllWithStats()` |
| models | `useModelsByBrand(brandId)` | `modelsService.getByBrandId()` |
| models | `useCreateModel()` | mutation |
| models | `useUpdateModel()` | mutation |
| models | `useDeleteModel()` | mutation |
| rentals | `useRentals()` | `rentalsService.getAll()` |
| rentals | `useAdminRentals()` | `rentalsService.getAllForAdmin()` |
| rentals | `useUserRentals(userId)` | `rentalsService.getByUserId()` |
| rentals | `useRentalById(id)` | `rentalsService.getById()` |
| rentals | `useRecentRentals(limit?)` | `rentalsService.getRecent()` |
| rentals | `useUpcomingRentals(userId)` | `rentalsService.getUpcoming()` |
| rentals | `useUserStats(userId)` | `rentalsService.getUserStats()` |
| rentals | `useRentalStats()` | `rentalsService.getStats()` |
| rentals | `useUpdateReservationStatus()` | mutation → `rentalsService.updateStatus()` |
| dashboard | `useDashboardKPIs()` | `dashboardService.getKPIs()` |
| dashboard | `useStatusDistribution()` | `dashboardService.getStatusDistribution()` |
| dashboard | `useFleetAvailability()` | `dashboardService.getFleetAvailability()` |
| dashboard | `useCityPerformance()` | `dashboardService.getCityPerformance()` |
| dashboard | `useRecentReservations()` | `dashboardService.getRecentReservations()` |
| dashboard | `useRecentActivity()` | `dashboardService.getRecentActivity()` |
| locations | `useLocations()` | `locationsService.getAll()` |
| locations | `useLocationsByCity(city)` | `locationsService.getByCity()` |
| locations | `useCities()` | `locationsService.getCities()` |
| blog | `useBlogPosts()` | `blogService.getAll()` |
| blog | `useBlogPost(slug)` | `blogService.getBySlug()` |
| blog | `useRecentBlogPosts(limit?)` | `blogService.getRecent()` |
| reviews | `useReviews()` | `reviewsService.getAll()` |
| reviews | `useRecentReviews(limit?)` | `reviewsService.getRecent()` |
| faq | `useFAQ()` | `faqService.getAll()` |
| faq | `useFAQByCategory(category)` | `faqService.getByCategory()` |
| users | `useAdminUsers()` | `usersService.getAllWithStats()` |
| users | `useAdminUser(id)` | `usersService.getById()` |
| users | `useUserReservations(userId)` | `usersService.getUserReservations()` |
| auth | `useAuthRedirect()` | role-based redirect helper |

---

## 8. STATE MANAGEMENT

### 8.1 Auth Store (`lib/store/auth.store.ts`)
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;

  login(payload: LoginPayload): Promise<void>;
  register(payload: RegisterPayload): Promise<void>;
  logout(): Promise<void>;
  hydrateSession(): Promise<void>;
  clearError(): void;
}
```
**Selectors:** `selectUser`, `selectIsAuthenticated`, `selectIsAdmin`, `selectUserRole`, `selectIsHydrated`
**Persistence:** localStorage key `"veyra_session"` (JSON: `{ user, token, expiresAt }`)
**Token expiry:** 24 saat

### 8.2 Booking Store (`lib/store/booking.store.ts`)
```typescript
interface BookingState {
  car: Car | null;
  pickupLocation: BookingLocation | null;
  returnLocation: BookingLocation | null;
  dates: BookingDates | null;
  rentalDays: number;
  selectedInsurance: InsurancePackage | null;
  selectedExtras: ExtraService[];
  driverInfo: DriverFormValues | null;
  paymentInfo: PaymentFormValues | null;
  currentStep: BookingStep;
  isProcessing: boolean;
  bookingResult: BookingResult | null;

  initBooking(params): void;
  setInsurance(pkg | null): void;
  toggleExtra(extra): void;
  setDriverInfo(info): void;
  setPaymentInfo(info): void;
  setStep(step): void;
  setProcessing(val): void;
  setBookingResult(result): void;
  reset(): void;
}
```
**Price Computation:** `computePriceBreakdown(car, rentalDays, insurance, extras)` → `PriceLine[]`
- Base: `pricePerDay * rentalDays`
- Insurance: `insurance.pricePerDay * rentalDays`
- Extra (PER_DAY): `extra.pricePerDay * rentalDays`
- Extra (ONE_TIME): `extra.pricePerDay`
- Deposit: gösterilir ama toplama eklenmez
- Total = base + insurance + extras (deposit hariç)

### 8.3 UI Store (`lib/store/ui.store.ts`)
```typescript
interface UIState {
  locale: "tr" | "en";
  currency: "TRY" | "EUR" | "USD";
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  setLocale/setCurrency/setSidebarOpen/toggleSidebar/setMobileMenuOpen
}
```
**Persistence:** Zustand persist middleware, localStorage key `"veyra-ui"`

---

## 9. AUTH FLOW & GUARD SİSTEMİ

### Akış
1. **App mount** → `AuthProvider` → `hydrateSession()` çağrılır
2. `resolveSession()` → localStorage'dan token + user yükle, expiry kontrol et
3. `isHydrated = true` set edilir → guard'lar artık karar verebilir
4. **Login** → `POST authService.login()` → `{ user, token }` döner → store'a yaz + localStorage'a persist
5. **Role redirect** → ADMIN → `/admin`, USER → `/account`
6. **Logout** → store temizle + localStorage temizle

### Guard Davranışları

| Guard | Koşul | Başarısız → Redirect |
|-------|-------|---------------------|
| AuthGuard | `isAuthenticated === true` | `/login` |
| AdminGuard | `isAuthenticated && role === "ADMIN"` | non-admin → `/account`, non-auth → `/login` |
| GuestGuard | `isAuthenticated === false` | ADMIN → `/admin`, USER → `/account` |

**Kritik:** Tüm guard'lar `isHydrated` kontrolü yapar. Hydration tamamlanmadan render etmez (loading spinner gösterir). Bu, SSR/hydration mismatch'i önler.

### Demo Credentials
- **Admin:** `admin@veyra.com.tr` (herhangi bir şifre)
- **User:** `elif.demir@email.com` (herhangi bir şifre)

---

## 10. BOOKING FLOW

### 4 Adım

**Adım 0: Araç Seçimi** (`/fleet` veya `/fleet/[slug]`)
- Kullanıcı araç seçer → `initBooking()` çağrılır
- Car, locations, dates, rentalDays store'a yazılır
- `router.push(ROUTES.BOOKING)`

**Adım 1: Booking Özet** (`/booking`)
- `BookingCarSummary` — araç bilgileri
- `InsuranceSelector` — 3 paket seçimi (radio)
- `ExtrasSelector` — checkbox list
- `DriverForm` — RHF + driverSchema validation
- `PriceBreakdown` — `computePriceBreakdown()` ile hesaplama
- Submit → `setDriverInfo()` + `setStep("payment")` → `/booking/payment`

**Adım 2: Ödeme** (`/booking/payment`)
- Prerequisite: `car` ve `driverInfo` yoksa redirect
- `PaymentForm` — RHF + paymentSchema validation
- Submit → `setPaymentInfo()` + mock 2s delay + generate code → `setBookingResult()` → `/booking/confirmation`

**Adım 3: Onay** (`/booking/confirmation`)
- Prerequisite: `bookingResult` yoksa redirect
- `ConfirmationCard` — reservationCode, tüm özet bilgisi

### Reservation Code Format
```
"VYR-" + Date.now().toString(36).toUpperCase().slice(-6)
Örnek: "VYR-N7K2M1"
```

---

## 11. ADMIN PANEL

### Sidebar Navigasyon Grupları
1. **Genel:** Dashboard
2. **Filo Yönetimi:** Araçlar, Markalar, Modeller
3. **Operasyon:** Rezervasyonlar, Kullanıcılar
4. **İçerik:** İçerik, SSS, Blog, Değerlendirmeler [placeholder]
5. **Sistem:** Ayarlar [placeholder]

### CRUD Pattern
- **Listeleme:** `<Table>` component + TanStack Query data
- **Oluştur/Düzenle:** `<Sheet>` (slide panel) içinde form
- **Sil:** `<Dialog>` ile onay
- **Mutation:** `useCreateX()`, `useUpdateX()`, `useDeleteX()` → `invalidateQueries` on success

### Dashboard Component'leri
- `KPICard` — büyük metrik kartları (6 adet)
- `StatusDistribution` — donut/pie chart (recharts)
- `FleetAvailability` — bar chart
- `CityPerformance` — tablo
- `RecentReservationsTable` — son 5 rezervasyon
- `ActivityFeed` — zaman çizelgesi

---

## 12. KRİTİK KURALLAR & UYARILAR

### Backend Entegrasyon İçin Kritik

1. **ID'ler `string` tipinde.** Frontend tüm entity'lerde `id: string` kullanıyor. Backend int döndürüyorsa `String(id)` dönüşümü yapılmalı.

2. **Tüm tarihler ISO 8601 string.** `"2026-03-15T10:00:00.000Z"` formatında. `LocalDate` değil `LocalDateTime` veya ISO string.

3. **Enum değerleri BÜYÜK HARF.** `"GASOLINE"` (gasoline değil), `"AUTOMATIC"` (automatic değil), `"PENDING"` (pending değil). Küçük harf dönerse frontend crash eder.

4. **Service fonksiyonları array döndürür.** Spring `Page<T>` döndürüyorsa, frontend `content` array'ini extract etmeli. Frontend şu anda pagination desteklemiyor.

5. **`slug` field'ları unique ve URL-safe olmalı.** Format: `"bmw-3-serisi-2024"`. Türkçe karakterler yok, boşluk yerine tire.

6. **`imageUrls` bir DİZİ, tek string değil.** Backend tek `imageUrl` döndürüyorsa `[imageUrl]` olarak sarılmalı.

7. **`InsurancePackage` ve `ExtraService` Car entity'sinin İÇİNDE.** Ayrı endpoint değil. Her Car response'unda `insurancePackages[]` ve `extras[]` döndürülmeli.

8. **AuthResponse `user` bilgisi İÇERMELİ.** Sadece `{ token }` dönerse frontend user bilgisini alamaz. Ya response'a user ekle, ya da login sonrası otomatik `/users/me` çağrısı yap.

9. **`reservationCode` backend tarafından üretilmeli.** Format: `"VYR-XXXXXX"` (6 harf/rakam).

10. **`grandTotal` deposit'i İÇERMEZ.** `grandTotal = subtotal + extrasTotal + insuranceTotal`. Deposit ayrı gösterilir.

### Mock Data Gerçekleri
- Türkiye şehirleri: İstanbul, Ankara, İzmir, Antalya, Bodrum, Dalaman
- 8 marka: BMW, Mercedes-Benz, Audi, Toyota, Fiat, Renault, Volkswagen, Volvo
- 23 model, 14+ araç, 22 lokasyon (OFFICE + AIRPORT)
- 3 sigorta paketi: Temel Kasko (ücretsiz), Tam Koruma (350₺/gün), Premium Koruma (550₺/gün)
- 5 ekstra hizmet: Ek Sürücü, Çocuk Koltuğu, Navigasyon, Havalimanı Teslimat, Tam Depo Teslim

---

## 13. BACKEND ENTEGRASYON KONTRATTI

### API'ye Bağlanacak Servisler
| Service | API Base | Notlar |
|---------|----------|--------|
| authService | `/api/auth` | login + register → AuthResponse (user + token) |
| carsService | `/api/cars` | CRUD + filter + slug + featured |
| brandsService | `/api/brands` | CRUD |
| modelsService | `/api/carmodels` | CRUD + getByBrand |
| rentalsService | `/api/rentals` | CRUD + status update + stats |
| usersService | `/api/users` | profile + password |
| dashboardService | `/api/dashboard` | KPI + charts (admin) |

### Mock Olarak Kalacak Servisler (backend karşılığı yok)
- `blogService` — blog post'lar
- `reviewsService` — müşteri değerlendirmeleri
- `faqService` — SSS
- `locationsService` — alış/iade lokasyonları

### Frontend'in Beklediği Auth Flow
```
1. POST /api/auth/login  { email, password }
   → { user: User, token: string }

2. POST /api/auth/register  { firstName, lastName, email, phone, password }
   → { user: User, token: string }

3. GET /api/users/me  (Bearer token header)
   → { id, firstName, lastName, email, phone, role }

4. Token: Authorization: Bearer <jwt>
5. 401 response → otomatik logout + /login redirect
```

### CORS
Backend mutlaka `http://localhost:3000` origin'ine izin vermelidir.

---

## 14. PROVIDER STACK (Root Layout)

```
<ThemeProvider attribute="class" defaultTheme="system">
  <QueryProvider>           // TanStack QueryClient
    <AuthProvider>          // hydrateSession() on mount
      <TooltipProvider>
        {children}
        <Toaster />         // sonner toast
      </TooltipProvider>
    </AuthProvider>
  </QueryProvider>
</ThemeProvider>
```

---

## 15. APP CONFIG

```typescript
// lib/constants/config.ts
APP_CONFIG = {
  name: "Veyra",
  tagline: "Premium Araç Kiralama",
  description: "Dakik, premium ve hızlı araç kiralama.",
  defaultLocale: "tr",
  locales: ["tr", "en"],
  defaultCurrency: "TRY",
  currencies: ["TRY", "EUR", "USD"],
  contact: {
    phone: "+90 850 123 4567",
    whatsapp: "+90 532 123 4567",
    email: "info@veyra.com.tr",
  },
}
```

---

## 16. YARDIMCI FONKSİYONLAR

```typescript
// lib/utils.ts
cn(...inputs: ClassValue[]): string     // clsx + tailwind-merge
delay(ms: number = 200): Promise<void>  // mock latency simulation

// lib/utils/format.ts
formatCurrency(amount: number, currency?: string, locale?: string): string
formatDate(date: string | Date, pattern?: string, locale?: string): string
formatDateRelative(date: string | Date, locale?: string): string
```

---

*Son güncelleme: 2026-03-18 — Aşama 1-18 tamamlanmış prototype durumu*
