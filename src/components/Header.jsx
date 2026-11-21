import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SplitVLogo } from './SplitVLogo';
import {
  Search,
  Heart,
  ShoppingBag,
  Scale,
  Menu,
  X,
} from 'lucide-react';

export function Header({ searchQuery, setSearchQuery, onSelectCategory }) {
  const {
    cartTotals,
    wishlist,
    compareList,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsCompareModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-bg-raised/90 backdrop-blur-md border-b border-line-subtle transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded p-1"
        >
          <SplitVLogo variant="horizontal" markSize={30} showTagline={false} />
        </a>

        {/* Search Bar (Desktop / Tablet) */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4 relative">
          <label htmlFor="header-search-input" className="sr-only">
            Search technology by model, brand, or specification
          </label>
          <div className="relative w-full">
            <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="header-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laptops, audio, displays, keyboards..."
              className="w-full pl-9 pr-8 py-2 text-xs font-sans bg-bg-base border border-line-subtle rounded text-text-primary placeholder:text-text-tertiary focus:border-accent transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Header Navigation Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Comparison Matrix Button */}
          <button
            type="button"
            onClick={() => setIsCompareModalOpen(true)}
            className="relative p-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-surface rounded border border-transparent hover:border-line-subtle transition-colors"
            title="Open Comparison Matrix"
            aria-label={`Open Comparison Matrix with ${compareList.length} items`}
          >
            <Scale className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-on-accent text-[10px] font-mono font-bold flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-surface rounded border border-transparent hover:border-line-subtle transition-colors"
            title="Open Wishlist"
            aria-label={`Open Wishlist with ${wishlist.length} saved items`}
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-accent' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-on-accent text-[10px] font-mono font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded bg-bg-surface border border-line-strong hover:border-accent text-text-primary transition-colors"
            aria-label={`Open Cart with ${cartTotals.itemCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-accent" />
              {cartTotals.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-full bg-accent text-on-accent text-[9px] font-mono font-bold flex items-center justify-center">
                  {cartTotals.itemCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline-block text-xs font-mono font-medium">
              Cart ({cartTotals.itemCount})
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-text-secondary hover:text-text-primary"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search & Menu Tray */}
      {mobileMenuOpen && (
        <div className="sm:hidden p-4 bg-bg-surface border-t border-line-subtle flex flex-col gap-3 animate-in slide-in-from-top duration-200">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalogue..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-bg-base border border-line-subtle rounded text-text-primary focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1 pt-2 border-t border-line-subtle">
            <button
              type="button"
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs py-2 text-text-secondary hover:text-accent font-mono uppercase"
            >
              All Categories
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('laptops');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs py-2 text-text-secondary hover:text-accent font-mono uppercase"
            >
              Laptops & Workstations
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('audio');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs py-2 text-text-secondary hover:text-accent font-mono uppercase"
            >
              Audio & Acoustics
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('displays');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs py-2 text-text-secondary hover:text-accent font-mono uppercase"
            >
              Displays & Vision
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('peripherals');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs py-2 text-text-secondary hover:text-accent font-mono uppercase"
            >
              Mechanical & Peripherals
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
