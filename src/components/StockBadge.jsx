import React from 'react';

/**
 * StockBadge - Accessible stock level indicator with paired icon and label.
 * Color never carries meaning alone.
 */
export function StockBadge({ status, count, className = '' }) {
  if (status === 'out_of_stock' || count === 0) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-mono text-danger ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-danger shrink-0" aria-hidden="true" />
        <span>Out of Stock</span>
      </span>
    );
  }

  if (status === 'low_stock' || (count && count <= 3)) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-mono text-warning ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse shrink-0" aria-hidden="true" />
        <span>Only {count ?? 2} Remaining</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-mono text-success ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" aria-hidden="true" />
      <span>In Stock</span>
    </span>
  );
}
