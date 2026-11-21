import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Price } from './Price';
import { StockBadge } from './StockBadge';

export function WishlistDrawer() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useApp();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsWishlistOpen(false);
    };
    if (isWishlistOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-bg-base/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsWishlistOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
    >
      <div
        className="w-full max-w-md h-full bg-bg-surface border-l border-line-strong flex flex-col shadow-floating text-text-primary animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-line-subtle bg-bg-raised flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-accent fill-accent" />
            <h2 id="wishlist-drawer-title" className="text-lg font-medium text-text-primary">
              Saved in Wishlist
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-bg-overlay font-mono text-text-secondary border border-line-subtle">
              {wishlist.length} items
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-bg-overlay transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-line-subtle">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-tertiary">
              <Heart className="w-12 h-12 mb-3 stroke-[1.2] opacity-40 text-text-secondary" />
              <p className="text-base font-medium text-text-secondary mb-1">Your wishlist is empty</p>
              <p className="text-xs text-text-tertiary max-w-[240px] mb-6">
                Click the heart icon on any product to save it for review or future purchase.
              </p>
              <button
                type="button"
                onClick={() => setIsWishlistOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover transition-colors"
              >
                Browse Showroom
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                <div className="w-20 h-20 rounded bg-bg-raised border border-line-subtle overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent truncate">
                        {product.brand}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product)}
                        className="text-text-tertiary hover:text-danger p-1 -mr-1 transition-colors"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-sm font-medium text-text-primary leading-tight line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="mt-1">
                      <StockBadge status={product.stockStatus} count={product.stockCount} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <Price paise={product.price} size="sm" />
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-on-accent" />
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
