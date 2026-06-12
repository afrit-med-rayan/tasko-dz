import { PageShell } from "@/components/layout/PageShell";
import { searchFreelancers } from "@/lib/api";
import { FreelancersList } from "./FreelancersList";

export const metadata = {
  title: "Freelancers — Tasko",
};

interface Props {
  searchParams: { q?: string; category?: string };
}

export default function FreelancersPage({ searchParams }: Props) {
  const data = searchFreelancers({
    q: searchParams.q,
    category: searchParams.category,
  });

  return (
    <PageShell>
      <FreelancersList
        freelancers={data.data}
        total={data.meta.total}
        initialQuery={searchParams.q}
        initialCategory={searchParams.category}
      />
    </PageShell>
  );
}
