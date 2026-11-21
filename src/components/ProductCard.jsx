import React from 'react';
import { Heart, Scale, Eye, ShoppingBag, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Price } from './Price';
import { StockBadge } from './StockBadge';

export function ProductCard({ product }) {
  const {
    isInWishlist,
    toggleWishlist,
    isInCompare,
    toggleCompare,
    addToCart,
    setQuickViewProduct,
  } = useApp();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className="group relative flex flex-col bg-bg-surface border border-line-subtle rounded transition-all duration-200 hover:border-line-strong hover:shadow-floating">
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-raised rounded-t border-b border-line-subtle">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-360 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Top Floating Controls */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Badge */}
          {product.badge ? (
            <span className="pointer-events-auto px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider font-medium bg-bg-base/90 text-text-primary border border-line-strong rounded-sm backdrop-blur">
              {product.badge}
            </span>
          ) : <span />}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className={`pointer-events-auto p-2 rounded-full border transition-colors ${
              isFavorited
                ? 'bg-accent/20 border-accent text-accent'
                : 'bg-bg-base/80 border-line-strong text-text-secondary hover:text-text-primary hover:border-text-secondary'
            } backdrop-blur`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-accent text-accent' : ''}`} />
          </button>
        </div>

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-bg-base/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-primary bg-bg-overlay/95 border border-line-strong rounded shadow-floating hover:border-accent hover:text-accent transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick Inspect
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-1 p-4">
        {/* Eyebrow & Stock Status */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-mono tracking-eyebrow uppercase text-accent font-medium truncate">
            {product.brand} · {product.eyebrow}
          </span>
          <StockBadge status={product.stockStatus} count={product.stockCount} />
        </div>

        {/* Product Title */}
        <h3
          onClick={() => setQuickViewProduct(product)}
          className="text-base font-medium text-text-primary leading-snug cursor-pointer hover:text-accent transition-colors line-clamp-1 mb-1"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Key Specs Pill Preview */}
        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4 min-h-[36px]">
          {product.keySpecs.join(' · ')}
        </p>

        {/* Bottom Section: Price & Actions */}
        <div className="mt-auto pt-3 border-t border-line-subtle flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <Price paise={product.price} originalPaise={product.originalPrice} size="md" />
            <span className="text-[11px] text-text-tertiary font-mono">Incl. GST</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Compare Toggle Button */}
            <button
              type="button"
              onClick={() => toggleCompare(product)}
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-medium rounded border transition-all ${
                isCompared
                  ? 'bg-accent-wash text-accent border-accent'
                  : 'bg-bg-raised text-text-secondary border-line-subtle hover:text-text-primary hover:border-line-strong'
              }`}
              aria-pressed={isCompared}
            >
              {isCompared ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent" />
                  Comparing
                </>
              ) : (
                <>
                  <Scale className="w-3.5 h-3.5 text-text-tertiary" />
                  Compare
                </>
              )}
            </button>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-on-accent" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
