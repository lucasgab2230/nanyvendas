import { ArrowUpRight, Heart } from "lucide-react";
import type { Product } from "../../api/catalog/products";
import { JewelPlate } from "./jewel-plate";
import { formatPrice } from "../lib/whatsapp";
import { useSelection } from "./selection-provider";

export type CatalogProduct = Omit<Product, "category"> & { category: string };

export function ProductCard<T extends CatalogProduct>({
  product,
  categoryName,
  onOpen,
  selectable = true,
}: {
  product: T;
  categoryName?: string;
  variant?: "vertical" | "horizontal";
  onOpen: (product: T) => void;
  selectable?: boolean;
}) {
  const selection = useSelection();
  const saved = selectable && selection.ids.includes(product.id);
  return (
    <article className="product-card" data-product-id={product.id}>
      <div className="product-card-visual">
        <button
          type="button"
          className="product-image-button"
          onClick={() => onOpen(product)}
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <JewelPlate image={product.image} alt={product.name} />
        </button>
        {product.featured && <span className="product-badge">Seleção Nany</span>}
        {selectable && (
          <button
            type="button"
            className={`favorite-button ${saved ? "is-saved" : ""}`}
            aria-label={`${saved ? "Remover" : "Salvar"} ${product.name}${saved ? " da" : " na"} seleção`}
            aria-pressed={saved}
            onClick={() => selection.toggle(product)}
          >
            <Heart
              size={19}
              strokeWidth={1.6}
              fill={saved ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      <div className="product-card-info">
        <span className="product-category">{categoryName ?? product.category}</span>
        <h3>
          <button type="button" onClick={() => onOpen(product)}>
            {product.name}
          </button>
        </h3>
        <p className={`product-price ${product.price === null ? "price-on-request" : ""}`}>
          {product.price === null ? "Preço sob consulta" : formatPrice(product.price)}
        </p>
        <button className="product-detail-button" type="button" onClick={() => onOpen(product)}>
          Ver a peça <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
