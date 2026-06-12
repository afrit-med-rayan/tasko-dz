import { getFeaturedFreelancers } from "@/lib/api";
import { FeaturedFreelancersClient } from "./FeaturedFreelancersClient";

export function FeaturedFreelancers() {
  const freelancers = getFeaturedFreelancers();
  return <FeaturedFreelancersClient freelancers={freelancers} />;
}
