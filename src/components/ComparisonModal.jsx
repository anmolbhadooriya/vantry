import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Scale, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Price } from './Price';
import { StockBadge } from './StockBadge';

export function ComparisonModal() {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    addToCart,
  } = useApp();

  const [highlightDiffs, setHighlightDiffs] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCompareModalOpen(false);
      }
    };
    if (isCompareModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCompareModalOpen, setIsCompareModalOpen]);

  if (!isCompareModalOpen || compareList.length === 0) return null;

  // Gather all unique spec keys across all compared products
  const allSpecKeys = Array.from(
    new Set(compareList.flatMap((p) => Object.keys(p.specs || {})))
  );

  // Helper: test if row has differing values across compared products
  const isRowDifferent = (key) => {
    if (compareList.length <= 1) return false;
    const firstVal = compareList[0].specs?.[key];
    return compareList.some((p) => p.specs?.[key] !== firstVal);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-bg-base/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsCompareModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-dialog-title"
    >
      <div
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-bg-surface border border-line-strong rounded-lg shadow-floating text-text-primary overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-line-subtle bg-bg-raised flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-accent-wash text-accent border border-accent/40">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-eyebrow text-accent font-medium">
                  Vantry Analytical Engine
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-bg-overlay text-text-secondary border border-line-subtle font-mono">
                  {compareList.length} of 3 Products
                </span>
              </div>
              <h2
                id="comparison-dialog-title"
                className="text-xl sm:text-2xl font-display font-normal text-text-primary"
              >
                Side-by-Side Comparison Matrix
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Diff Highlighting Toggle */}
            <button
              type="button"
              onClick={() => setHighlightDiffs((h) => !h)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                highlightDiffs
                  ? 'bg-accent-wash text-accent border-accent/50'
                  : 'bg-bg-surface text-text-tertiary border-line-subtle hover:text-text-primary'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Highlight Differences: {highlightDiffs ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={clearCompare}
              className="text-xs text-text-tertiary hover:text-danger font-mono transition-colors px-2 py-1"
            >
              Clear All
            </button>

            <button
              type="button"
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-bg-overlay border border-line-subtle transition-colors"
              aria-label="Close comparison view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table / Matrix (Scrollable) */}
        <div className="overflow-x-auto flex-1 p-4 sm:p-6">
          <table className="w-full border-collapse min-w-[640px]">
            {/* Sticky Product Cards Header */}
            <thead>
              <tr>
                <th className="w-1/4 p-4 text-left align-bottom border-b border-line-strong bg-bg-surface sticky left-0 z-20">
                  <span className="text-xs font-mono uppercase tracking-eyebrow text-text-tertiary block">
                    Product Specification
                  </span>
                  <span className="text-sm text-text-secondary font-sans font-normal mt-1 block">
                    Review nuances & verified hardware specs
                  </span>
                </th>
                {compareList.map((product) => (
                  <th
                    key={product.id}
                    className="w-1/4 p-4 text-left align-top border-b border-line-strong bg-bg-surface"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="relative aspect-[4/3] rounded bg-bg-raised overflow-hidden border border-line-subtle">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-bg-base/80 text-text-secondary hover:text-danger border border-line-strong backdrop-blur transition-colors"
                          aria-label={`Remove ${product.name}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent block">
                          {product.brand}
                        </span>
                        <h3 className="text-sm font-medium text-text-primary line-clamp-1">
                          {product.name}
                        </h3>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <Price paise={product.price} size="md" />
                        <StockBadge status={product.stockStatus} count={product.stockCount} />
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-on-accent" />
                        Add to Cart
                      </button>
                    </div>
                  </th>
                ))}

                {/* Empty slot placeholder up to 3 */}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <th
                    key={idx}
                    className="w-1/4 p-4 border-b border-line-strong bg-bg-surface/50 text-center align-middle"
                  >
                    <div className="border border-dashed border-line-strong rounded p-8 flex flex-col items-center justify-center text-text-tertiary">
                      <Scale className="w-6 h-6 mb-2 opacity-50" />
                      <p className="text-xs font-mono uppercase tracking-wider">
                        Available Comparison Slot
                      </p>
                      <p className="text-[11px] text-text-tertiary mt-1">
                        Select another product in the showroom
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Spec Rows */}
            <tbody className="divide-y divide-line-subtle text-xs">
              {/* Category Group Row */}
              <tr className="bg-bg-raised/40">
                <td className="p-3 font-mono font-medium text-text-tertiary uppercase tracking-wider sticky left-0 bg-bg-raised/40 z-10">
                  Category
                </td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-3 text-text-secondary font-medium">
                    {product.specs['Category Group'] || product.category}
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="p-3" />
                ))}
              </tr>

              {/* Dynamic Spec Rows with Diff Highlighting */}
              {allSpecKeys.map((specKey) => {
                if (specKey === 'Category Group') return null; // already displayed
                const isDiff = isRowDifferent(specKey);
                const isHighlighted = highlightDiffs && isDiff;

                return (
                  <tr
                    key={specKey}
                    className={`transition-colors ${
                      isHighlighted
                        ? 'bg-diff-highlight'
                        : 'hover:bg-bg-raised/30'
                    }`}
                  >
                    <td
                      className={`p-3.5 font-mono text-text-secondary sticky left-0 z-10 ${
                        isHighlighted
                          ? 'bg-bg-surface border-l-2 border-accent text-accent font-medium'
                          : 'bg-bg-surface text-text-tertiary'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {isHighlighted && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                            title="Difference detected"
                          />
                        )}
                        <span>{specKey}</span>
                      </div>
                    </td>

                    {compareList.map((product) => {
                      const val = product.specs?.[specKey] || '—';
                      return (
                        <td
                          key={product.id}
                          className={`p-3.5 leading-relaxed tabular-data ${
                            isHighlighted ? 'text-text-primary font-medium' : 'text-text-secondary'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}

                    {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                      <td key={idx} className="p-3.5" />
                    ))}
                  </tr>
                );
              })}

              {/* Standout Highlights Row */}
              <tr className="bg-bg-raised/50">
                <td className="p-3.5 font-mono uppercase tracking-wider text-accent font-medium sticky left-0 bg-bg-surface z-10">
                  Key Differentiator
                </td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-3.5 text-text-secondary">
                    <p className="text-xs italic leading-relaxed">
                      "{product.highlights?.[0] || product.tagline}"
                    </p>
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="p-3.5" />
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-line-subtle bg-bg-raised flex items-center justify-between text-xs text-text-tertiary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>
              Rows tinted in muted electric orange highlight mechanical & engineering differences.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCompareModalOpen(false)}
            className="px-4 py-2 rounded bg-bg-surface border border-line-strong text-text-primary hover:border-text-secondary transition-colors"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
}
