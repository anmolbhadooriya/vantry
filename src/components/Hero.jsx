import React from 'react';
import { ArrowRight, Scale, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Price } from './Price';

export function Hero({ onExploreClick, featuredProduct }) {
  const { setQuickViewProduct, setIsCompareModalOpen, toggleCompare, isInCompare } = useApp();

  return (
    <section className="relative overflow-hidden bg-bg-base border-b border-line-subtle pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background ambient structure */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Orange Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-bg-surface border border-line-subtle mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-eyebrow text-accent font-medium">
                Vantry Showroom Edition · India
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-text-primary tracking-tight leading-[1.08] mb-6">
              Thoughtfully selected technology.
              <span className="block italic text-text-secondary mt-1">
                See the difference.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed max-w-xl mb-8">
              Every device on Vantry is curated for engineering distinction and acoustic precision.
              Inspect true verified specifications, compare side-by-side, and invest with certainty.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press transition-colors shadow-sm"
              >
                <span>Explore Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsCompareModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium rounded border border-line-strong bg-bg-surface text-text-primary hover:border-accent hover:text-accent transition-colors"
              >
                <Scale className="w-4 h-4 text-accent" />
                <span>Open Comparison Matrix</span>
              </button>
            </div>

            {/* Reassurance Micro-Points */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-line-subtle w-full max-w-lg">
              <div>
                <span className="block text-xl font-display font-medium text-text-primary">
                  100%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary">
                  Verified Specs
                </span>
              </div>
              <div>
                <span className="block text-xl font-display font-medium text-text-primary">
                  3-Way
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary">
                  Live Comparison
                </span>
              </div>
              <div>
                <span className="block text-xl font-display font-medium text-text-primary">
                  ₹0
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary">
                  Insured Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Featured Hardware Hero Spotlight (5 cols) */}
          {featuredProduct && (
            <div className="lg:col-span-5 w-full">
              <div className="relative p-6 sm:p-7 rounded-lg bg-bg-surface border border-line-strong shadow-floating group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-eyebrow text-accent font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Spotlight Hardware
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-bg-base border border-line-subtle text-text-secondary">
                    {featuredProduct.badge}
                  </span>
                </div>

                {/* Hardware Photo Container */}
                <div
                  className="relative aspect-video sm:aspect-[4/3] rounded bg-bg-raised overflow-hidden border border-line-subtle cursor-pointer mb-5"
                  onClick={() => setQuickViewProduct(featuredProduct)}
                >
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-360 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-base/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Hardware Details */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-text-tertiary">
                        {featuredProduct.brand}
                      </span>
                      <h3
                        onClick={() => setQuickViewProduct(featuredProduct)}
                        className="text-lg font-medium text-text-primary hover:text-accent transition-colors cursor-pointer"
                      >
                        {featuredProduct.name}
                      </h3>
                    </div>
                    <Price paise={featuredProduct.price} size="md" />
                  </div>

                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    "{featuredProduct.tagline}"
                  </p>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-line-subtle">
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(featuredProduct)}
                      className="flex-1 py-2 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover transition-colors text-center"
                    >
                      Quick Inspect
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompare(featuredProduct)}
                      className={`px-3 py-2 text-xs font-medium rounded border transition-colors ${
                        isInCompare(featuredProduct.id)
                          ? 'bg-accent-wash border-accent text-accent'
                          : 'border-line-strong text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
