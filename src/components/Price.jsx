import React from 'react';
import { formatCurrency } from '../lib/format';

/**
 * Price - Standardized INR currency formatter component.
 * Stored in integer paise, formatted with Indian digit grouping.
 */
export function Price({
  paise,
  originalPaise,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
}) {
  const sizeClasses = {
    sm: 'text-sm font-medium',
    md: 'text-base font-medium',
    lg: 'text-xl font-semibold',
    xl: 'text-2xl lg:text-3xl font-semibold',
  };

  const formatted = formatCurrency(paise);
  const formattedOriginal = originalPaise ? formatCurrency(originalPaise) : null;

  return (
    <div className={`inline-flex items-baseline gap-2 tabular-data ${className}`}>
      <span className={`text-text-primary ${sizeClasses[size]}`}>{formatted}</span>
      {formattedOriginal && (
        <span className="text-xs lg:text-sm text-text-tertiary line-through">
          {formattedOriginal}
        </span>
      )}
    </div>
  );
}
