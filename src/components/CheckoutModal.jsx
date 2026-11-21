import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Price } from './Price';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building,
  Truck,
  ArrowRight,
  ShoppingBag,
  Loader2,
} from 'lucide-react';

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotals,
    clearCart,
    orderConfirmation,
    setOrderConfirmation,
  } = useApp();

  const [formData, setFormData] = useState({
    name: 'Anmol Singh',
    email: 'anmol@example.com',
    phone: '9876543210',
    address: '42, 100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    paymentMethod: 'upi', // 'upi' | 'card' | 'netbanking'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        setIsCheckoutOpen(false);
      }
    };
    if (isCheckoutOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCheckoutOpen, setIsCheckoutOpen, isSubmitting]);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment authorization & order generation
    setTimeout(() => {
      const generatedOrderId = `VAN-${Math.floor(10000 + Math.random() * 90000)}-IN`;
      const confirmation = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        estimatedDelivery: '3 to 4 Business Days (Insured White-Glove)',
        items: [...cart],
        totals: { ...cartTotals },
        shippingAddress: { ...formData },
      };
      setOrderConfirmation(confirmation);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmation(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-bg-base/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-dialog-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-bg-surface border border-line-strong rounded-lg shadow-floating text-text-primary p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-bg-overlay border border-line-subtle transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* VIEW 1: ORDER CONFIRMED SCREEN */}
        {/* ============================================================ */}
        {orderConfirmation ? (
          <div className="py-4 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent-wash border border-accent/40 flex items-center justify-center text-accent mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono uppercase tracking-eyebrow text-accent font-semibold">
              Payment & Verification Successful
            </span>
            <h2
              id="checkout-dialog-title"
              className="text-2xl sm:text-3xl font-display font-normal text-text-primary mt-1 mb-2"
            >
              Order Reserved in Showroom
            </h2>

            <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
              Thank you for choosing Vantry. Your curated hardware is being prepared under strict quality control.
            </p>

            {/* Order Card */}
            <div className="w-full max-w-md bg-bg-raised border border-line-subtle rounded p-5 text-left mb-6 space-y-3">
              <div className="flex justify-between items-baseline border-b border-line-subtle pb-3">
                <span className="text-xs font-mono uppercase text-text-tertiary">Order Reference</span>
                <span className="text-sm font-mono font-semibold text-accent">
                  {orderConfirmation.orderId}
                </span>
              </div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Estimated Arrival</span>
                <span className="font-medium text-text-primary">
                  {orderConfirmation.estimatedDelivery}
                </span>
              </div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Shipping To</span>
                <span className="text-text-primary truncate max-w-[200px]">
                  {orderConfirmation.shippingAddress.city}, {orderConfirmation.shippingAddress.state}
                </span>
              </div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Payment</span>
                <span className="text-text-primary capitalize font-mono">
                  {orderConfirmation.shippingAddress.paymentMethod} (Simulated Auth)
                </span>
              </div>
              <div className="pt-2 border-t border-line-subtle flex justify-between items-baseline">
                <span className="text-xs font-mono uppercase text-text-tertiary">Total Paid</span>
                <Price paise={orderConfirmation.totals.totalPaise} size="md" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded bg-accent text-on-accent text-xs font-semibold hover:bg-accent-hover active:bg-accent-press transition-colors shadow-sm"
            >
              Return to Showroom
            </button>
          </div>
        ) : (
          /* ============================================================ */
          /* VIEW 2: CHECKOUT FORM & REVIEW */
          /* ============================================================ */
          <div>
            <div className="mb-6 pb-4 border-b border-line-subtle flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-eyebrow text-accent font-medium">
                  Direct Showroom Checkout
                </span>
                <h2 id="checkout-dialog-title" className="text-xl sm:text-2xl font-display font-normal text-text-primary">
                  Review & Simulated Purchase
                </h2>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Delivery & Payment (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Contact Info */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3 flex items-center gap-1.5">
                    <span>01</span>
                    <span>Recipient Information</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-text-secondary mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-text-secondary mb-1">
                        Contact Phone (+91)
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono text-text-secondary mb-1">
                        Email for Delivery Tracking
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3 flex items-center gap-1.5">
                    <span>02</span>
                    <span>Delivery Address in India</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono text-text-secondary mb-1">
                        Street Address / Apartment
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-text-secondary mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-text-secondary mb-1">
                          State
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                        >
                          <option value="Karnataka">Karnataka</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi NCR</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Gujarat">Gujarat</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-text-secondary mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary font-mono focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3 flex items-center gap-1.5">
                    <span>03</span>
                    <span>Simulated Payment Gateway</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'upi', name: 'UPI / QR', icon: QrCode, desc: 'Instant GPay, PhonePe' },
                      { id: 'card', name: 'Credit Card', icon: CreditCard, desc: 'Visa, Mastercard' },
                      { id: 'netbanking', name: 'NetBanking', icon: Building, desc: 'HDFC, ICICI, SBI' },
                    ].map((pm) => {
                      const Icon = pm.icon;
                      const active = formData.paymentMethod === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                          className={`p-3 rounded border text-left flex flex-col justify-between transition-colors ${
                            active
                              ? 'bg-accent-wash border-accent text-accent'
                              : 'bg-bg-raised border-line-subtle text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          <Icon className="w-4 h-4 mb-2" />
                          <div>
                            <span className="text-xs font-medium block text-text-primary">
                              {pm.name}
                            </span>
                            <span className="text-[10px] text-text-tertiary block font-mono">
                              {pm.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="lg:col-span-5 bg-bg-raised p-5 rounded border border-line-subtle flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-4">
                    Items In Order ({cartTotals.itemCount})
                  </h3>

                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1 divide-y divide-line-subtle">
                    {cart.map(({ product, quantity }) => (
                      <div key={product.id} className="pt-2 first:pt-0 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded bg-bg-base border border-line-subtle shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-text-primary truncate">
                            {product.name}
                          </p>
                          <span className="text-[11px] text-text-tertiary font-mono">
                            Qty: {quantity}
                          </span>
                        </div>
                        <Price paise={product.price * quantity} size="sm" />
                      </div>
                    ))}
                  </div>

                  {/* Calculations breakdown */}
                  <div className="mt-6 pt-4 border-t border-line-subtle space-y-2 text-xs">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <Price paise={cartTotals.subtotalPaise} size="sm" />
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>GST (18% inclusive)</span>
                      <Price paise={cartTotals.gstPaise} size="sm" className="text-text-tertiary" />
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Express Courier</span>
                      <span className="text-success font-medium">Free</span>
                    </div>
                    <div className="pt-2 border-t border-line-subtle flex justify-between items-baseline text-base font-semibold text-text-primary">
                      <span>Total Amount</span>
                      <Price paise={cartTotals.totalPaise} size="lg" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-line-subtle">
                  <div className="flex items-center gap-2 text-[11px] text-text-tertiary mb-4">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>Simulated environment: No actual transaction will occur.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Authorizing Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Authorize Simulated Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
