import type { ProductType } from "@/types/product.type";
import { Link } from "react-router-dom";
interface Props {
  product: ProductType;
}

const ProductCard = ({ product }: Props) => {
  return (
    <li className="group cursor-pointer">
      <Link to={`/product/${product._id}`}>
        <div className="mb-4 aspect-3/4 overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">
          {product.category[0]}
        </p>
        <p className="text-sm tracking-wide">{product.name}</p>
        <p className="mt-1 text-sm font-medium">
          ₩{product.price.toLocaleString()}
        </p>
      </Link>
    </li>
  );
};

export default ProductCard;
