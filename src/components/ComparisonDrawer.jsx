import React from 'react';
import { useApp } from '../context/AppContext';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { Price } from './Price';

/**
 * ComparisonDrawer - Floating bottom tray when 1 or more products are queued for comparison.
 * Max 3 products.
 */
export function ComparisonDrawer() {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    setIsCompareModalOpen,
  } = useApp();

  if (compareList.length === 0) return null;

  return (
    <aside
      aria-label="Comparison dock"
      className="fixed bottom-0 left-0 right-0 z-40 bg-bg-surface/95 backdrop-blur-md border-t border-line-strong shadow-sheet transform animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Indicator & slots */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded bg-accent-wash text-accent border border-accent/30">
              <Scale className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-text-tertiary">
                Compare Queue
              </span>
              <p className="text-xs font-medium text-text-primary">
                {compareList.length} of 3 Products Selected
              </p>
            </div>
          </div>

          {/* Product Previews */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {compareList.map((product) => (
              <div
                key={product.id}
                className="relative flex items-center gap-2 px-2.5 py-1.5 bg-bg-raised border border-line-subtle rounded group shrink-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-7 h-7 object-cover rounded bg-bg-base"
                />
                <div className="hidden md:block">
                  <p className="text-xs font-medium text-text-primary max-w-[120px] truncate">
                    {product.name}
                  </p>
                  <Price paise={product.price} size="sm" className="text-[11px]" />
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCompare(product.id)}
                  className="p-1 text-text-tertiary hover:text-danger rounded transition-colors"
                  aria-label={`Remove ${product.name} from comparison`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Empty slot indicators up to 3 */}
            {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
              <div
                key={idx}
                className="hidden lg:flex items-center justify-center w-28 h-10 border border-dashed border-line-subtle rounded text-[11px] font-mono text-text-tertiary px-2 text-center"
              >
                + Empty Slot
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={clearCompare}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-raised rounded border border-transparent transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>

          <button
            type="button"
            onClick={() => setIsCompareModalOpen(true)}
            disabled={compareList.length < 2}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Compare {compareList.length} Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
