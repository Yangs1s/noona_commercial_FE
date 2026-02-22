export interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string[];
  stock: { size: string; quantity: number }[];
  status: string;
  sku: string;
}

export interface ProductResponse {
  data: ProductType[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface ProductQueryParams {
  page: number;
  limit: number;
  sort: "createdAt" | "updatedAt" | "name" | "price";
  order: "asc" | "desc";
  query: string;
}
