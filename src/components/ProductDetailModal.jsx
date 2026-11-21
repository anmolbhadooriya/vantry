import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Price } from './Price';
import { StockBadge } from './StockBadge';
import { X, Heart, Scale, ShoppingBag, ShieldCheck, Truck, ArrowRight, Check } from 'lucide-react';

export function ProductDetailModal() {
  const {
    quickViewProduct: product,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    isInCompare,
    toggleCompare,
    setIsCheckoutOpen,
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
      }
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, setQuickViewProduct]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-bg-base/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setQuickViewProduct(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-surface border border-line-strong rounded-lg shadow-floating text-text-primary p-6 lg:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 p-2 rounded-full text-text-secondary hover:text-text-primary bg-bg-raised border border-line-subtle hover:border-line-strong transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Media Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded bg-bg-raised border border-line-subtle overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-mono uppercase tracking-wider bg-bg-base/90 border border-line-strong rounded-sm text-text-primary backdrop-blur">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="p-3.5 bg-bg-raised rounded border border-line-subtle flex flex-col gap-2 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-accent shrink-0" />
                <span>Complimentary Express Courier across India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Authentic Manufacturer Hardware Warranty</span>
              </div>
            </div>
          </div>

          {/* Details Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-mono tracking-eyebrow uppercase text-accent font-medium">
                {product.brand} · {product.eyebrow}
              </span>
              <StockBadge status={product.stockStatus} count={product.stockCount} />
            </div>

            <h2
              id="modal-product-title"
              className="text-2xl lg:text-3xl font-display font-normal text-text-primary mb-2 leading-tight"
            >
              {product.name}
            </h2>

            <p className="text-sm font-sans italic text-text-secondary mb-4 border-l-2 border-accent pl-3">
              "{product.tagline}"
            </p>

            <div className="mb-6 pb-6 border-b border-line-subtle flex items-baseline justify-between">
              <Price paise={product.price} originalPaise={product.originalPrice} size="xl" />
              <span className="text-xs text-text-tertiary font-mono">Inclusive of 18% GST</span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-eyebrow text-text-tertiary mb-2">
                Showroom Overview
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Engineering Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="mb-6 p-4 bg-bg-raised rounded border border-line-subtle">
                <h4 className="text-xs font-mono uppercase tracking-eyebrow text-accent mb-3">
                  Why It Differs
                </h4>
                <ul className="space-y-2">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Matrix */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-eyebrow text-text-tertiary mb-3">
                Key Technical Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-2.5 bg-bg-raised rounded border border-line-subtle flex flex-col"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-tertiary">
                      {key}
                    </span>
                    <span className="text-xs font-medium text-text-primary mt-0.5 tabular-data">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase & Action Controls */}
            <div className="mt-auto pt-4 border-t border-line-subtle flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-line-strong rounded bg-bg-raised">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="w-10 text-center text-sm font-mono font-medium text-text-primary tabular-data">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-on-accent" />
                  Add to Cart
                </button>

                {/* Direct Buy Now */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded border border-line-strong bg-bg-overlay text-text-primary hover:border-accent hover:text-accent transition-colors"
                >
                  Buy Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Auxiliary toggles: Wishlist & Compare */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                    isFavorited
                      ? 'bg-accent/15 border-accent text-accent'
                      : 'border-line-subtle text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-accent text-accent' : ''}`} />
                  {isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
                </button>

                <button
                  type="button"
                  onClick={() => toggleCompare(product)}
                  className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                    isCompared
                      ? 'bg-accent-wash border-accent text-accent'
                      : 'border-line-subtle text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {isCompared ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent" />
                      In Comparison Tray
                    </>
                  ) : (
                    <>
                      <Scale className="w-3.5 h-3.5 text-text-tertiary" />
                      Add to Comparison (Max 3)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
