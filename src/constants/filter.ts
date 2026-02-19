export const SORT_OPTIONS = [
  { label: "최신순", sort: "createdAt", order: "desc" },
  { label: "오래된순", sort: "createdAt", order: "asc" },
  { label: "가격 낮은순", sort: "price", order: "asc" },
  { label: "가격 높은순", sort: "price", order: "desc" },
  { label: "이름순", sort: "name", order: "asc" },
] as const;
