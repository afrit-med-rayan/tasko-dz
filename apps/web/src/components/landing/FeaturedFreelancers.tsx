import { getFeaturedFreelancers, type FreelancerSummary } from "@/lib/api";
import { FeaturedFreelancersClient } from "./FeaturedFreelancersClient";

export async function FeaturedFreelancers() {
  let freelancers: FreelancerSummary[] = [];
  try {
    freelancers = await getFeaturedFreelancers();
  } catch {
    freelancers = [];
  }

  return <FeaturedFreelancersClient freelancers={freelancers} />;
}
