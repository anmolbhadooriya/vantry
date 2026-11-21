import React from 'react';

/**
 * Vantry Split V Logo
 *
 * Mark Concept: A 'V' comprised of two distinct strokes.
 * - Left stroke: Warm off-white (`currentColor` or `#F3EEE6`), standard height.
 * - Right stroke: Accent orange (`#E8642C`), drawn ~14% taller than the left stroke.
 * - Hairline gap separating the strokes at the base apex.
 * Two near-identical elements, one visible difference: "See the difference."
 */
export function SplitVLogo({
  variant = 'horizontal', // 'mark' | 'horizontal' | 'stacked'
  className = '',
  markSize = 28,
  showTagline = false,
  animated = false,
}) {
  // SVG Mark: ViewBox 0 0 36 40
  // Left stroke: from (5, 6) down to (15, 34), width ~3.8
  // Right stroke: from (31, 1) down to (19, 34), width ~3.8, right stroke is ~14% taller (starts at Y=1 vs Y=6)
  // Hairline gap at bottom apex between X=15 and X=19
  const MarkSVG = (
    <svg
      width={markSize}
      height={Math.round((markSize * 40) / 36)}
      viewBox="0 0 36 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${animated ? 'transition-transform duration-300 hover:scale-105' : ''}`}
      aria-label="Vantry Split V Mark"
    >
      {/* Left Stroke: Warm Off-White (#F3EEE6) */}
      <path
        d="M6 7L15 34H11.5L2.5 7H6Z"
        fill="currentColor"
        className="transition-colors duration-200"
      />
      {/* Right Stroke: Muted Electric Orange (#E8642C) - 14% taller at apex */}
      <path
        d="M33.5 1.5L20.5 34H17L30 1.5H33.5Z"
        fill="#E8642C"
        className="transition-colors duration-200"
      />
    </svg>
  );

  // Geometric custom wordmark VANTRY with chevron 'A' (no crossbar)
  const WordmarkText = (
    <div className="flex flex-col justify-center select-none">
      <div className="flex items-center tracking-wordmark font-sans font-semibold text-text-primary uppercase text-lg leading-none">
        <span className="text-text-primary">V</span>
        {/* Open chevron A without crossbar */}
        <span className="inline-block relative px-[1px]">
          <svg className="w-3.5 h-3.5 inline-block text-text-primary" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L1.5 14.5H4L8 6L12 14.5H14.5L8 2Z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-text-primary">NTRY</span>
      </div>
      {showTagline && (
        <span className="text-[10px] tracking-widest text-text-tertiary uppercase mt-1 font-mono">
          See the difference.
        </span>
      )}
    </div>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{MarkSVG}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
        {MarkSVG}
        {WordmarkText}
      </div>
    );
  }

  // Default: horizontal lockup
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {MarkSVG}
      {WordmarkText}
    </div>
  );
}
