import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  CART: 'vantry_cart_v1',
  WISHLIST: 'vantry_wishlist_v1',
  PROFILE: 'vantry_profile_v1',
  ORDERS: 'vantry_orders_v1',
};

const DEFAULT_PROFILE = {
  name: 'Anmol Singh',
  email: 'anmol@vantry.in',
  phone: '9876543210',
  address: '42, 100 Feet Road, Indiranagar',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560038',
};

export function AppProvider({ children }) {
  // ----------------------------------------------------
  // Toast Notifications System
  // ----------------------------------------------------
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ----------------------------------------------------
  // Wishlist State (persisted in LocalStorage)
  // ----------------------------------------------------
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    setWishlist((prev) =>
      exists ? prev.filter((item) => item.id !== product.id) : [...prev, product]
    );

    // Call showToast OUTSIDE the state updater to prevent duplicate calls in React StrictMode
    if (exists) {
      showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      showToast(`Added "${product.name}" to wishlist`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  // ----------------------------------------------------
  // Cart State (persisted in LocalStorage)
  // ----------------------------------------------------
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Clean, single-dispatch addToCart that invokes showToast exactly once outside state updaters
  const addToCart = (product, quantity = 1) => {
    const existing = cart.find((item) => item.product.id === product.id);
    const newQty = existing ? existing.quantity + quantity : quantity;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });

    // Notify exactly once outside setState
    if (existing) {
      showToast(`Updated quantity for "${product.name}" (${newQty})`, 'success');
    } else {
      showToast(`Added "${product.name}" to cart`, 'success');
    }
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const found = cart.find((item) => item.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (found) {
      showToast(`Removed "${found.product.name}" from cart`, 'info');
    }
  };

  const clearCart = () => setCart([]);

  // Cart calculations
  const cartTotals = useMemo(() => {
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotalPaise = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const shippingPaise = 0;
    const gstPaise = Math.round((subtotalPaise * 18) / 118);
    const totalPaise = subtotalPaise;

    return {
      itemCount,
      subtotalPaise,
      shippingPaise,
      gstPaise,
      totalPaise,
    };
  }, [cart]);

  // ----------------------------------------------------
  // Product Comparison (up to 3 products)
  // ----------------------------------------------------
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleCompare = (product) => {
    const exists = compareList.some((p) => p.id === product.id);
    if (exists) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed "${product.name}" from comparison`, 'info');
      return;
    }
    if (compareList.length >= 3) {
      showToast('Comparison limit reached (max 3 products). Remove one to add this.', 'warning');
      return;
    }
    setCompareList((prev) => [...prev, product]);
    showToast(`Added "${product.name}" to comparison (${compareList.length + 1}/3)`, 'success');
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (productId) => compareList.some((p) => p.id === productId);

  // ----------------------------------------------------
  // User Profile State (persisted in LocalStorage)
  // ----------------------------------------------------
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const updateProfile = (newProfile) => {
    setUserProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
      showToast('Profile updated successfully', 'success');
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  };

  // ----------------------------------------------------
  // Orders State (persisted in LocalStorage)
  // ----------------------------------------------------
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveOrder = (newOrder) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save orders to localStorage', e);
      }
      return updated;
    });
  };

  // ----------------------------------------------------
  // Active UI Drawers & Modals
  // ----------------------------------------------------
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const value = {
    // Wishlist
    wishlist,
    toggleWishlist,
    isInWishlist,
    isWishlistOpen,
    setIsWishlistOpen,

    // Cart
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotals,
    isCartOpen,
    setIsCartOpen,

    // Compare
    compareList,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,

    // User Profile & Orders (Task 2)
    userProfile,
    updateProfile,
    orders,
    saveOrder,
    isAccountOpen,
    setIsAccountOpen,

    // Modals
    quickViewProduct,
    setQuickViewProduct,
    isCheckoutOpen,
    setIsCheckoutOpen,
    orderConfirmation,
    setOrderConfirmation,

    // Toasts
    toasts,
    showToast,
    dismissToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
