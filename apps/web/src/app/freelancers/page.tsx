import { PageShell } from "@/components/layout/PageShell";
import { searchFreelancers } from "@/lib/api";
import { FreelancersList } from "./FreelancersList";

export const metadata = {
  title: "Freelancers — Tasko",
};

interface Props {
  searchParams: { q?: string; category?: string };
}

export default async function FreelancersPage({ searchParams }: Props) {
  let data: Awaited<ReturnType<typeof searchFreelancers>> = { data: [], meta: { total: 0 } };
  try {
    data = await searchFreelancers({
      q: searchParams.q,
      category: searchParams.category,
      limit: 20,
    });
  } catch {
    /* API offline */
  }

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
