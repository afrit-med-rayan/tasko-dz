import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { getService } from "@/lib/api";
import { ServiceDetail } from "./ServiceDetail";

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props) {
  const s = getService(params.id);
  if (!s) return { title: "Service — Tasko" };
  return { title: `${s.title} — Tasko` };
}

export default function ServicePage({ params }: Props) {
  const service = getService(params.id);
  if (!service) notFound();

  return (
    <PageShell>
      <ServiceDetail service={service} />
    </PageShell>
  );
}
