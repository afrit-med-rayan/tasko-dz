import { getCategories, type Category } from "@/lib/api";
import { CategoryGrid } from "./CategoryGrid";

export async function CategoryShowcase() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return <CategoryGrid categories={categories} />;
}
