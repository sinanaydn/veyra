"use client";

import { use } from "react";
import { CarDetailShell } from "@/components/car-detail/car-detail-shell";

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = use(params);
  return <CarDetailShell slug={slug} />;
}
