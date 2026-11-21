import React, { useState, useMemo, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import { SearchX, SlidersHorizontal } from 'lucide-react';

function VantryShowroom() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const catalogueRef = useRef(null);

  const scrollToCatalogue = () => {
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // In-stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.stockStatus !== 'out_of_stock');
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.keySpecs.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Featured order
        break;
    }

    return result;
  }, [selectedCategory, inStockOnly, searchQuery, sortBy]);

  // Spotlight featured product
  const featuredProduct = PRODUCTS.find((p) => p.id === 'lap-mbp-16') || PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary selection:bg-accent selection:text-on-accent">
      {/* Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={scrollToCatalogue}
        featuredProduct={featuredProduct}
      />

      {/* Product Catalogue Section */}
      <main id="catalogue" ref={catalogueRef} className="flex-1 pb-24">
        {/* Category & Filter Navigation Bar */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          inStockOnly={inStockOnly}
          onToggleInStockOnly={setInStockOnly}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-3 border-b border-line-subtle">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-eyebrow text-accent font-medium">
                Curated Catalogue
              </span>
              <h2 className="text-2xl font-display font-normal text-text-primary mt-0.5">
                {selectedCategory === 'all'
                  ? 'All Showroom Devices'
                  : PRODUCTS.find((p) => p.category === selectedCategory)?.category || 'Selected Technology'}
              </h2>
            </div>
            <span className="text-xs font-mono text-text-tertiary">
              Comparing up to 3 models simultaneously
            </span>
          </div>

          {/* Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center p-6 bg-bg-surface/50 border border-line-subtle rounded-lg">
              <SearchX className="w-12 h-12 text-text-tertiary mb-3 opacity-50" />
              <h3 className="text-lg font-medium text-text-primary mb-1">
                No matching hardware found
              </h3>
              <p className="text-xs text-text-secondary max-w-sm mb-6">
                No products match "{searchQuery}" with the current filters. Try resetting search or selecting all categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setInStockOnly(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating Comparison Tray */}
      <ComparisonDrawer />

      {/* Modals & Overlays */}
      <ComparisonModal />
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />

      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Showroom Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <VantryShowroom />
    </AppProvider>
  );
}
