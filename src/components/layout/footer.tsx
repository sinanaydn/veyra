import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { ROUTES } from "@/lib/constants/routes";
import { APP_CONFIG } from "@/lib/constants/config";

const FOOTER_LINKS = {
  Hizmetler: [
    { label: "Filo", href: ROUTES.FLEET },
    { label: "Havalimanı Kiralama", href: ROUTES.FLEET },
    { label: "Kurumsal Kiralama", href: ROUTES.FLEET },
    { label: "Rezervasyon", href: ROUTES.BOOKING },
  ],
  Kurumsal: [
    { label: "Hakkımızda", href: ROUTES.ABOUT },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "SSS", href: ROUTES.FAQ },
    { label: "İletişim", href: ROUTES.CONTACT },
  ],
  Hesap: [
    { label: "Giriş Yap", href: ROUTES.LOGIN },
    { label: "Kayıt Ol", href: ROUTES.REGISTER },
    { label: "Rezervasyonlarım", href: ROUTES.ACCOUNT_RESERVATIONS },
    { label: "Profilim", href: ROUTES.ACCOUNT_PROFILE },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Dakik, premium ve hızlı araç kiralama. Net koşullar, rafine filo, hızlı onay.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a
                href={`tel:${APP_CONFIG.contact.phone}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {APP_CONFIG.contact.phone}
              </a>
              <a
                href={`mailto:${APP_CONFIG.contact.email}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {APP_CONFIG.contact.email}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Veyra. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Kullanım Koşulları
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              KVKK
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
