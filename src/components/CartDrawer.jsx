import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { Price } from './Price';

export function CartDrawer() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotals,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useApp();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-bg-base/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        className="w-full max-w-md h-full bg-bg-surface border-l border-line-strong flex flex-col shadow-floating text-text-primary animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-line-subtle bg-bg-raised flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h2 id="cart-drawer-title" className="text-lg font-medium text-text-primary">
              Your Showroom Cart
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-bg-overlay font-mono text-text-secondary border border-line-subtle">
              {cartTotals.itemCount} items
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-bg-overlay transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-5 py-2.5 bg-bg-overlay/60 border-b border-line-subtle flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            Complimentary Insured Courier
          </span>
          <span className="text-accent font-medium">Free across India</span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-line-subtle">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-tertiary">
              <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.2] opacity-40 text-text-secondary" />
              <p className="text-base font-medium text-text-secondary mb-1">Your cart is empty</p>
              <p className="text-xs text-text-tertiary max-w-[240px] mb-6">
                Explore thoughtfully selected technology from the Vantry showroom.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover transition-colors"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 rounded bg-bg-raised border border-line-subtle overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent truncate">
                        {product.brand}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="text-text-tertiary hover:text-danger p-1 -mr-1 transition-colors"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-sm font-medium text-text-primary leading-tight line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-line-subtle rounded bg-bg-raised text-xs">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="px-2 py-1 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-mono font-medium text-text-primary">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="px-2 py-1 text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <Price paise={product.price * quantity} size="sm" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-line-subtle bg-bg-raised flex flex-col gap-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <Price paise={cartTotals.subtotalPaise} size="sm" />
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Estimated GST (18% inclusive)</span>
                <Price paise={cartTotals.gstPaise} size="sm" className="text-text-tertiary" />
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>White-Glove Delivery</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <div className="pt-2 border-t border-line-subtle flex justify-between items-baseline text-sm font-medium text-text-primary">
                <span>Order Total</span>
                <Price paise={cartTotals.totalPaise} size="lg" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press transition-colors shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="text-[11px] text-center text-text-tertiary hover:text-danger font-mono transition-colors"
            >
              Clear Entire Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
