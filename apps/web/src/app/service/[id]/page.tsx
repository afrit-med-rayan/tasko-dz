import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { getService } from "@/lib/api";
import { ServiceDetail } from "./ServiceDetail";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const s = await getService(params.id);
    return { title: `${s.title} — Tasko` };
  } catch {
    return { title: "Service — Tasko" };
  }
}

export default async function ServicePage({ params }: Props) {
  let service;
  try {
    service = await getService(params.id);
  } catch {
    notFound();
  }

  return (
    <PageShell>
      <ServiceDetail service={service} />
    </PageShell>
  );
}
