import React from 'react';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal, Check } from 'lucide-react';

export function CategoryNav({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStockOnly,
  totalResults,
}) {
  return (
    <div className="w-full bg-bg-surface/50 border-y border-line-subtle py-4 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider shrink-0 transition-all ${
                  isSelected
                    ? 'bg-accent text-on-accent font-semibold shadow-sm'
                    : 'bg-bg-raised text-text-secondary border border-line-subtle hover:text-text-primary hover:border-line-strong'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Filter Controls (Sort & In-Stock) */}
        <div className="flex items-center gap-4 self-end md:self-auto text-xs">
          {/* Result Count */}
          <span className="text-text-tertiary font-mono hidden sm:inline-block">
            {totalResults} {totalResults === 1 ? 'Device' : 'Devices'}
          </span>

          {/* In-Stock Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-text-secondary hover:text-text-primary">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStockOnly(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                inStockOnly
                  ? 'bg-accent border-accent text-on-accent'
                  : 'bg-bg-raised border-line-strong'
              }`}
            >
              {inStockOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="font-mono text-xs">In Stock Only</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-text-tertiary font-mono">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-mono bg-bg-raised border border-line-subtle rounded text-text-primary focus:border-accent cursor-pointer"
            >
              <option value="featured">Editorial Choice</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
