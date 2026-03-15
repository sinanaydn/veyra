"use client";

import {
  Globe,
  Banknote,
  Bell,
  Shield,
  Palette,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/lib/constants/config";

function SettingSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/50 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sistem Ayarları</h1>
        <p className="text-sm text-muted-foreground">
          Platform genelindeki tercihleri ve yapılandırmayı yönetin.
        </p>
      </div>

      <div className="space-y-4">
        {/* General */}
        <SettingSection
          icon={Building}
          title="Genel Bilgiler"
          description="Marka adı ve temel site bilgileri"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Site Adı</Label>
              <Input defaultValue={APP_CONFIG.name} disabled />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Slogan</Label>
              <Input defaultValue={APP_CONFIG.tagline} disabled />
            </div>
          </div>
        </SettingSection>

        {/* Contact */}
        <SettingSection
          icon={Phone}
          title="İletişim Bilgileri"
          description="Müşteri tarafında gösterilen iletişim bilgileri"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Telefon</Label>
              <Input defaultValue={APP_CONFIG.contact.phone} disabled />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">WhatsApp</Label>
              <Input defaultValue={APP_CONFIG.contact.whatsapp} disabled />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">E-posta</Label>
              <Input defaultValue={APP_CONFIG.contact.email} disabled />
            </div>
          </div>
        </SettingSection>

        {/* Localization */}
        <SettingSection
          icon={Globe}
          title="Yerelleştirme"
          description="Dil ve bölge tercihleri"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Varsayılan Dil</Label>
              <select
                defaultValue="tr"
                disabled
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm opacity-60"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Varsayılan Para Birimi</Label>
              <select
                defaultValue="TRY"
                disabled
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm opacity-60"
              >
                <option value="TRY">Türk Lirası (₺)</option>
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dolar ($)</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection
          icon={Bell}
          title="Bildirimler"
          description="E-posta ve sistem bildirim tercihleri"
        >
          <div className="space-y-3">
            {[
              { label: "Yeni rezervasyon bildirimi", desc: "Her yeni rezervasyonda admin'e e-posta" },
              { label: "İptal bildirimi", desc: "Rezervasyon iptali durumunda bilgilendirme" },
              { label: "Düşük stok uyarısı", desc: "Müsait araç sayısı eşiğin altına düşünce uyarı" },
            ].map((n) => (
              <div
                key={n.label}
                className="flex items-center justify-between rounded-lg border border-border/30 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <div className="h-5 w-9 rounded-full bg-muted opacity-50" />
              </div>
            ))}
          </div>
        </SettingSection>

        {/* Security */}
        <SettingSection
          icon={Shield}
          title="Güvenlik"
          description="Erişim ve güvenlik politikaları"
        >
          <div className="space-y-3">
            {[
              { label: "İki faktörlü doğrulama", desc: "Admin girişlerinde 2FA zorunluluğu" },
              { label: "Oturum süresi", desc: "Otomatik oturum kapatma süresi" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between rounded-lg border border-border/30 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <div className="h-5 w-9 rounded-full bg-muted opacity-50" />
              </div>
            ))}
          </div>
        </SettingSection>

        {/* Theme */}
        <SettingSection
          icon={Palette}
          title="Görünüm"
          description="Tema ve renk tercihleri"
        >
          <div className="flex gap-3">
            {["Açık", "Koyu", "Sistem"].map((t) => (
              <div
                key={t}
                className={`rounded-lg border px-4 py-2 text-sm ${
                  t === "Sistem"
                    ? "border-primary bg-primary/5 font-medium text-primary"
                    : "border-border/50 text-muted-foreground opacity-60"
                }`}
              >
                {t}
              </div>
            ))}
          </div>
        </SettingSection>
      </div>

      <div className="flex justify-end border-t border-border/50 pt-4">
        <Button disabled>Değişiklikleri Kaydet</Button>
      </div>
    </div>
  );
}
