import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Price } from './Price';
import {
  X,
  User,
  Package,
  Heart,
  Calendar,
  CreditCard,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';

export function AccountModal() {
  const {
    isAccountOpen,
    setIsAccountOpen,
    userProfile,
    updateProfile,
    orders,
    wishlist,
    setIsWishlistOpen,
    setQuickViewProduct,
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'wishlist'
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Form state for profile editing
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        city: userProfile.city || '',
        state: userProfile.state || '',
      });
    }
  }, [userProfile]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedOrder) {
          setSelectedOrder(null);
        } else {
          setIsAccountOpen(false);
        }
      }
    };
    if (isAccountOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isAccountOpen, setIsAccountOpen, selectedOrder]);

  if (!isAccountOpen) return null;

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-bg-base/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsAccountOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-bg-surface border border-line-strong rounded-lg shadow-floating text-text-primary overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-line-subtle bg-bg-raised flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-wash border border-accent/40 flex items-center justify-center text-accent">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-eyebrow text-accent font-medium">
                Vantry Client Suite
              </span>
              <h2 id="account-modal-title" className="text-xl sm:text-2xl font-display font-normal text-text-primary">
                My Showroom Account
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-bg-overlay border border-line-subtle transition-colors"
            aria-label="Close account view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-bg-surface/90 border-b border-line-subtle flex gap-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab('orders');
              setSelectedOrder(null);
            }}
            className={`py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-accent text-accent font-semibold'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History</span>
            <span className="px-1.5 py-0.2 rounded-full bg-bg-overlay text-[10px] text-text-tertiary">
              {orders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('profile');
              setSelectedOrder(null);
            }}
            className={`py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-accent text-accent font-semibold'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('wishlist');
              setSelectedOrder(null);
            }}
            className={`py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'wishlist'
                ? 'border-accent text-accent font-semibold'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Hardware</span>
            <span className="px-1.5 py-0.2 rounded-full bg-bg-overlay text-[10px] text-text-tertiary">
              {wishlist.length}
            </span>
          </button>
        </div>

        {/* Tab Body Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {/* ============================================================== */}
          {/* TAB 1: ORDER HISTORY & DETAILS INSPECTOR */}
          {/* ============================================================== */}
          {activeTab === 'orders' && (
            <div>
              {selectedOrder ? (
                /* Subview: Individual Order Details */
                <div className="space-y-6">
                  {/* Top Bar with Back Button */}
                  <div className="flex items-center justify-between pb-4 border-b border-line-subtle">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to All Orders
                    </button>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-text-tertiary">Order:</span>
                      <span className="text-accent font-semibold">{selectedOrder.orderId}</span>
                    </div>
                  </div>

                  {/* Order Overview Card */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded bg-bg-raised border border-line-subtle text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-text-tertiary block mb-1">
                        Order Date & Status
                      </span>
                      <p className="font-medium text-text-primary">{selectedOrder.date}</p>
                      <span className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-mono text-success">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {selectedOrder.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-text-tertiary block mb-1">
                        Delivery Destination
                      </span>
                      <p className="font-medium text-text-primary">
                        {selectedOrder.shippingAddress?.name || userProfile.name}
                      </p>
                      <p className="text-text-secondary truncate">
                        {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-text-tertiary block mb-1">
                        Simulated Payment
                      </span>
                      <p className="font-medium text-text-primary capitalize font-mono">
                        {selectedOrder.paymentMethod || 'UPI / QR'} (Simulated Authorization)
                      </p>
                      <p className="text-text-tertiary text-[11px]">
                        No actual financial charges
                      </p>
                    </div>
                  </div>

                  {/* Itemized Hardware List */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3">
                      Hardware In This Order ({selectedOrder.items?.length || 0})
                    </h3>

                    <div className="space-y-3 divide-y divide-line-subtle">
                      {selectedOrder.items?.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="pt-3 first:pt-0 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-14 h-14 object-cover rounded bg-bg-raised border border-line-subtle shrink-0"
                            />
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-accent block">
                                {product.brand}
                              </span>
                              <h4 className="text-xs sm:text-sm font-medium text-text-primary">
                                {product.name}
                              </h4>
                              <span className="text-[11px] font-mono text-text-tertiary">
                                Quantity: {quantity}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <Price paise={product.price * quantity} size="sm" />
                            <span className="text-[10px] font-mono text-text-tertiary block">
                              Paise: {product.price * quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="p-4 rounded bg-bg-raised border border-line-subtle space-y-2 text-xs">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <Price paise={selectedOrder.totals?.subtotalPaise || 0} size="sm" />
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>GST (18% inclusive)</span>
                      <Price paise={selectedOrder.totals?.gstPaise || 0} size="sm" className="text-text-tertiary" />
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>White-Glove Insured Courier</span>
                      <span className="text-success font-medium">Free</span>
                    </div>
                    <div className="pt-2 border-t border-line-subtle flex justify-between items-baseline text-sm font-semibold text-text-primary">
                      <span>Total Paid</span>
                      <Price paise={selectedOrder.totals?.totalPaise || 0} size="lg" />
                    </div>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                /* Empty State when no orders exist */
                <div className="py-16 flex flex-col items-center justify-center text-center p-6 text-text-tertiary">
                  <Package className="w-14 h-14 mb-4 stroke-[1.2] opacity-40 text-text-secondary" />
                  <h3 className="text-base font-medium text-text-secondary mb-1">
                    No Showroom Orders Yet
                  </h3>
                  <p className="text-xs text-text-tertiary max-w-sm mb-6 leading-relaxed">
                    Orders completed through the simulated checkout will be automatically archived here with itemized specs and delivery statuses.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen(false)}
                    className="px-5 py-2.5 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-sm"
                  >
                    Explore Curated Catalogue
                  </button>
                </div>
              ) : (
                /* Order History Table / List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-text-tertiary">
                      Verified Orders ({orders.length})
                    </span>
                    <span className="text-[11px] text-text-tertiary font-mono">
                      Persistent across sessions
                    </span>
                  </div>

                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.orderId}
                        className="p-4 sm:p-5 rounded bg-bg-raised border border-line-subtle hover:border-line-strong transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-mono font-semibold text-accent">
                              {order.orderId}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/30">
                              <CheckCircle2 className="w-3 h-3" />
                              {order.status || 'Confirmed'}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-text-tertiary font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {order.date}
                            </span>
                            <span>·</span>
                            <span>{order.items?.length || 1} Products</span>
                            <span>·</span>
                            <span className="capitalize">{order.paymentMethod || 'UPI'}</span>
                          </div>

                          {/* Thumbnails of products */}
                          <div className="flex items-center gap-2 pt-2">
                            {order.items?.slice(0, 4).map((item, idx) => (
                              <img
                                key={idx}
                                src={item.product?.image}
                                alt={item.product?.name}
                                title={item.product?.name}
                                className="w-9 h-9 object-cover rounded bg-bg-base border border-line-subtle"
                              />
                            ))}
                            {(order.items?.length || 0) > 4 && (
                              <span className="w-9 h-9 rounded bg-bg-overlay border border-line-subtle text-[10px] font-mono flex items-center justify-center text-text-tertiary">
                                +{(order.items?.length || 0) - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-line-subtle">
                          <Price paise={order.totals?.totalPaise || 0} size="md" />
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-line-strong bg-bg-surface hover:border-accent hover:text-accent transition-colors"
                          >
                            <span>Inspect Order</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: EDITABLE PROFILE DETAILS */}
          {/* ============================================================== */}
          {activeTab === 'profile' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-1">
                  Personal Information & Address Book
                </h3>
                <p className="text-xs text-text-tertiary">
                  Your profile data is stored locally in your browser. This information automatically prefills showroom checkout.
                </p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">
                      Contact Phone (+91)
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">
                      Primary City
                    </label>
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-bg-raised border border-line-strong rounded text-text-primary focus:border-accent"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">
                      State / Region
                    </label>
                    <select
                      value={profileForm.state}
                      onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
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
                </div>

                <div className="pt-4 border-t border-line-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-text-tertiary">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>Saved instantly to LocalStorage.</span>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press transition-colors shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: WISHLIST SHORTCUT & PREVIEW */}
          {/* ============================================================== */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-line-subtle">
                <div>
                  <h3 className="text-sm font-medium text-text-primary">
                    Saved Showroom Hardware
                  </h3>
                  <p className="text-xs text-text-tertiary">
                    {wishlist.length} hardware pieces currently saved to your browser session.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAccountOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-bg-raised border border-line-strong hover:border-accent hover:text-accent transition-colors"
                >
                  <span>Open Full Wishlist Drawer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center text-text-tertiary">
                  <Heart className="w-12 h-12 mb-3 stroke-[1.2] opacity-40 text-text-secondary" />
                  <p className="text-sm font-medium text-text-secondary mb-1">No saved hardware</p>
                  <p className="text-xs text-text-tertiary max-w-xs mb-4">
                    Click the heart icon on any product in the catalogue to save it here.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded bg-accent text-on-accent hover:bg-accent-hover transition-colors"
                  >
                    Browse Catalogue
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 rounded bg-bg-raised border border-line-subtle flex items-center gap-3 cursor-pointer hover:border-line-strong transition-colors"
                      onClick={() => {
                        setIsAccountOpen(false);
                        setQuickViewProduct(product);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded bg-bg-base border border-line-subtle shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono uppercase text-accent truncate block">
                          {product.brand}
                        </span>
                        <h4 className="text-xs font-medium text-text-primary truncate">
                          {product.name}
                        </h4>
                        <Price paise={product.price} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
