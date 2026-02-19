import { CATEGORY_OPTIONS } from "@/constants/product";

export const PRICE_RANGES = [
  { label: "전체", min: 0, max: Infinity },
  { label: "10만원 이하", min: 0, max: 100000 },
  { label: "10만원 — 30만원", min: 100000, max: 300000 },
  { label: "30만원 이상", min: 300000, max: Infinity },
];

interface Props {
  selectedCategories: string[];
  onToggleCategory: (value: string) => void;
  selectedPriceRange: number;
  onSelectPriceRange: (index: number) => void;
}

const FilterSidebar = ({
  selectedCategories,
  onToggleCategory,
  selectedPriceRange,
  onSelectPriceRange,
}: Props) => {
  return (
    <aside
      aria-label="필터"
      className="w-52 shrink-0 border-r border-gray-100 px-6 py-12"
    >
      <div className="mb-10">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-black">
          카테고리
        </h2>
        <ul className="space-y-3">
          {CATEGORY_OPTIONS.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => onToggleCategory(cat.value)}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  selectedCategories.includes(cat.value)
                    ? "font-semibold text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-black">
          가격
        </h2>
        <ul className="space-y-3">
          {PRICE_RANGES.map((range, index) => (
            <li key={range.label}>
              <button
                onClick={() => onSelectPriceRange(index)}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  selectedPriceRange === index
                    ? "font-semibold text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default FilterSidebar;
