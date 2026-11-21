import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  CART: 'vantry_cart_v1',
  WISHLIST: 'vantry_wishlist_v1',
};

export function AppProvider({ children }) {
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
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to wishlist`, 'success');
        return [...prev, product];
      }
    });
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

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        showToast(`Updated quantity for "${product.name}" (${next[existingIndex].quantity})`, 'success');
        return next;
      } else {
        showToast(`Added "${product.name}" to cart`, 'success');
        return [...prev, { product, quantity }];
      }
    });
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
    setCart((prev) => {
      const found = prev.find((item) => item.product.id === productId);
      if (found) {
        showToast(`Removed "${found.product.name}" from cart`, 'info');
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const clearCart = () => setCart([]);

  // Cart calculations
  const cartTotals = useMemo(() => {
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotalPaise = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    // Free delivery on all orders in Vantry showroom
    const shippingPaise = 0;
    // 18% GST included or broken down
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
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from comparison`, 'info');
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('Comparison limit reached (max 3 products). Remove one to add this.', 'warning');
        return prev;
      }
      showToast(`Added "${product.name}" to comparison (${prev.length + 1}/3)`, 'success');
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (productId) => compareList.some((p) => p.id === productId);

  // ----------------------------------------------------
  // Active UI Drawers & Modals
  // ----------------------------------------------------
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // ----------------------------------------------------
  // Toast Notifications
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
