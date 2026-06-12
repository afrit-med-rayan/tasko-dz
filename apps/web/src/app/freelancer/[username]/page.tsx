import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { getFreelancerPublic, getFreelancerReviews } from "@/lib/api";
import { FreelancerProfileView } from "./FreelancerProfileView";

interface Props {
  params: { username: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const f = await getFreelancerPublic(params.username);
    return {
      title: `${f.name} — ${f.specialty} sur Tasko`,
      description: `${f.name}, freelancer ${f.specialty} à ${f.city} noté ${f.averageRating}/5 sur Tasko.`,
    };
  } catch {
    return { title: "Freelancer — Tasko" };
  }
}

export default async function FreelancerPage({ params }: Props) {
  let profile;
  let reviews: Awaited<ReturnType<typeof getFreelancerReviews>> = { data: [], averageRating: 0 };
  try {
    profile = await getFreelancerPublic(params.username);
    reviews = await getFreelancerReviews(profile.id);
  } catch {
    notFound();
  }

  return (
    <PageShell>
      <FreelancerProfileView profile={profile} reviews={reviews.data} />
    </PageShell>
  );
}
