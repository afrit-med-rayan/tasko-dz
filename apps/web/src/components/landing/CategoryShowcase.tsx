import { getCategories } from "@/lib/api";
import { CategoryGrid } from "./CategoryGrid";

export function CategoryShowcase() {
  const categories = getCategories();
  return <CategoryGrid categories={categories} />;
}
