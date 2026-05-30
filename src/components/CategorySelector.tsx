import { PopulationCategoryLabel } from "@/types/population";

type Category = {
  label: PopulationCategoryLabel;
};

type CategorySelectorProps = {
  categories: Category[];
  selectedCategory: PopulationCategoryLabel;
  setSelectedCategory: (category: PopulationCategoryLabel) => void;
};

export default function CategorySelector({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategorySelectorProps) {
  return (
    <div className="category-buttons">
      {categories.map((category) => (
        <button
          key={category.label}
          onClick={() => setSelectedCategory(category.label)}
          className={selectedCategory === category.label ? "active" : ""}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
