"use client";

import { useState, useMemo } from "react";
import { Search, Eye, Users, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDetailSheet } from "@/components/admin/user-detail-sheet";
import { useAdminUsers } from "@/features/users/hooks/useUsers";
import type { AdminUser } from "@/features/users/services/users.service";

const roleLabels: Record<string, { label: string; color: string }> = {
  ADMIN: {
    label: "Yönetici",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
  USER: {
    label: "Kullanıcı",
    color: "bg-primary/10 text-primary border-primary/20",
  },
};

function formatCurrency(val: number) {
  return val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
}

export default function AdminUsersPage() {
  const { data: users, isLoading } = useAdminUsers();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filtered = useMemo(() => {
    if (!users) return [];
    let result = [...users];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(q)
      );
    }

    if (roleFilter) {
      result = result.filter((u) => u.role === roleFilter);
    }

    return result;
  }, [users, search, roleFilter]);

  function handleDetail(user: AdminUser) {
    setSelectedUser(user);
    setSheetOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Kullanıcı Yönetimi
        </h1>
        <p className="text-sm text-muted-foreground">
          Kayıtlı kullanıcıları görüntüleyin, rol ve hesap bilgilerini
          inceleyin.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Ad, e-posta veya telefon ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Tüm Roller</option>
          <option value="ADMIN">Yönetici</option>
          <option value="USER">Kullanıcı</option>
        </select>
      </div>

      {/* Count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} kullanıcı listeleniyor
          {(search || roleFilter) && (
            <button
              onClick={() => {
                setSearch("");
                setRoleFilter("");
              }}
              className="ml-2 text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Filtreleri temizle
            </button>
          )}
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 py-16">
          <Users className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {search || roleFilter
              ? "Filtrelere uygun kullanıcı bulunamadı."
              : "Henüz kullanıcı bulunmuyor."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[160px]">Ad Soyad</TableHead>
                <TableHead className="min-w-[180px]">E-posta</TableHead>
                <TableHead className="min-w-[130px]">Telefon</TableHead>
                <TableHead className="min-w-[90px] text-center">
                  <span className="inline-flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5" />
                    Rol
                  </span>
                </TableHead>
                <TableHead className="min-w-[90px] text-center">
                  Rez.
                </TableHead>
                <TableHead className="min-w-[100px] text-right">
                  Harcama
                </TableHead>
                <TableHead className="min-w-[60px] text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => {
                const roleCfg = roleLabels[user.role] ?? roleLabels.USER;
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </div>
                        <span className="text-sm font-medium">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {user.phone}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={`text-xs ${roleCfg.color}`}
                      >
                        {roleCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm tabular-nums">
                      {user.reservationCount}
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums">
                      {user.totalSpent > 0
                        ? formatCurrency(user.totalSpent)
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDetail(user)}
                        title="Detay"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <UserDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        user={selectedUser}
      />
    </div>
  );
}
