import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { getFreelancerPublic, getFreelancerReviews } from "@/lib/api";
import { FreelancerProfileView } from "./FreelancerProfileView";

interface Props {
  params: { username: string };
}

export function generateMetadata({ params }: Props) {
  const f = getFreelancerPublic(params.username);
  if (!f) return { title: "Freelancer — Tasko" };
  return {
    title: `${f.name} — ${f.specialty} sur Tasko`,
    description: `${f.name}, freelancer ${f.specialty} à ${f.city} noté ${f.averageRating}/5 sur Tasko.`,
  };
}

export default function FreelancerPage({ params }: Props) {
  const profile = getFreelancerPublic(params.username);
  if (!profile) notFound();

  const reviews = getFreelancerReviews(profile.id);

  return (
    <PageShell>
      <FreelancerProfileView profile={profile} reviews={reviews.data} />
    </PageShell>
  );
}
