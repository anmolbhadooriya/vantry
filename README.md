# VANTRY — See the difference.

> *"A premium destination for discovering, comparing and purchasing thoughtfully selected technology."*

VANTRY is a high-performance, Dark Premium e-commerce showroom for the Indian market, focused on meticulous hardware curation, verified laboratory specifications, side-by-side analytical comparisons with difference highlighting, and a distraction-free shopping flow.

---

## 1. Quick Setup (< 5 Steps)

```bash
# 1. Clone repository
git clone <repository-url> vantry && cd vantry

# 2. Install dependencies (Node 20+ required)
npm install

# 3. Run automated test suite
npm test

# 4. Start local development server
npm run dev
# ➜ Access at http://localhost:5173

# 5. Build for production deployment
npm run build
npm run preview
```

---

## 2. Core Features Implemented

1. **Dark Premium Showroom Hero:**
   - Asymmetric layout, Instrument Serif display headlines, muted electric orange accents, verified hardware guarantees, and featured device spotlight.
2. **Curated Catalogue (16 Realistic Flagships):**
   - 4 Core Categories:
     - *Laptops & Workstations* (MacBook Pro 16 M3 Max, Dell XPS 16 OLED, ThinkPad X1 Carbon Gen 12, Framework Laptop 16)
     - *Audio & Acoustics* (Sennheiser HD 660S2, Sony WH-1000XM5, B&O Beoplay H95, Devialet Gemini II)
     - *Displays & Vision* (Apple Studio Display 27″ 5K, ASUS ProArt PA32UCG-K, LG UltraFine OLED Pro 32″, Samsung Odyssey OLED G9 49″)
     - *Mechanical & Peripherals* (Mode Sonnet 75%, Keychron Q1 Pro Wireless, Logitech MX Master 3S, Apple Magic Trackpad)
3. **Live Search & Category Filtering:**
   - Instant search across product titles, brands, specifications, and descriptions.
   - Category filtering pills with item counters.
   - Filter by In-Stock availability only.
   - Sorting by Editorial Choice, Price (Low-High / High-Low), and Customer Rating.
4. **Analytical 3-Way Product Comparison Matrix:**
   - Queue up to 3 devices simultaneously via bottom docked drawer.
   - Side-by-side specification table across Processor/Driver, Display/Acoustic, Memory/Sensitivity, Storage/Battery, Chassis, Connectivity, and Warranty.
   - **Difference Highlighting:** Toggles automatic visual tinting (`bg-diff-highlight` / `#E8642C` at 16% opacity) on specification rows where compared hardware attributes differ.
5. **Quick Inspect Modal (Detail View):**
   - High-resolution photography, engineering highlights ("Why It Differs"), full hardware specification matrix, quantity stepper, and direct Buy Now trigger.
6. **Persistent Wishlist (LocalStorage):**
   - Save devices with instant heart toggle, persistent across browser sessions, one-click Move to Cart.
7. **Persistent Shopping Cart (LocalStorage):**
   - Quantity increment/decrement, real-time integer paise total calculations, 18% inclusive GST calculation, and complimentary insured shipping banner.
8. **Simulated Indian Checkout & Order Confirmation:**
   - Recipient contact and Indian postal address with State selector and PIN Code validation.
   - Simulated payment gateways: UPI (GPay/PhonePe), Credit/Debit Card, and NetBanking.
   - Processing animation yielding unique Showroom Order Reference (e.g. `VAN-78412-IN`), delivery window, and cart flush.
9. **Accessible Notification Toast System:**
   - Live region (`aria-live="polite"`, `role="status"`) announcing cart updates, wishlist changes, and comparison limits.
10. **The Split V Brand Identity:**
    - Custom SVG Split V mark: warm off-white left stroke, electric orange right stroke (+14% taller), hairline apex gap, open-chevron A without crossbar.

---

## 3. Dark Premium Design Tokens

| Token | Hex Value | Purpose |
|---|---|---|
| `bg-base` | `#111214` | Primary deep page background |
| `bg-raised` | `#17191C` | Sticky header, footer, elevated sections |
| `bg-surface` | `#1E2125` | Cards, modals, drawers, input containers |
| `bg-overlay` | `#262A2F` | Menus, popovers, hover states |
| `line-subtle` | `#2A2D32` | Hairline borders and dividers |
| `line-strong` | `#3A3E45` | Emphasized input borders & card outlines |
| `text-primary` | `#F3EEE6` | Warm off-white headlines & primary copy |
| `text-secondary` | `#B9B3A8` | Supporting body copy and metadata |
| `text-tertiary` | `#8A857B` | Captions, timestamps, and labels |
| `accent` | `#E8642C` | Muted electric orange interactive accent |
| `accent-hover` | `#F77B45` | Hover state on primary interactive elements |
| `accent-press` | `#C94F1D` | Pressed / active interactive feedback |
| `accent-wash` | `rgba(232, 100, 44, 0.12)` | Subtle selected fills & active tags |
| `on-accent` | `#111214` | High-contrast dark text on orange fills |
| `success` | `#7FB685` | In-stock and verified indicators |
| `warning` | `#E0B04A` | Low-stock and threshold alerts |
| `danger` | `#D9604F` | Out-of-stock and removal actions |
| `diff-highlight` | `rgba(232, 100, 44, 0.16)` | Comparison table row divergence tint |

---

## 4. Currency and Formatting Rules

All monetary values are stored as **integer paise** (₹1 = 100 paise) to prevent IEEE-754 floating-point drift.
All currency formatting flows exclusively through `src/lib/format.js`:
- Uses `Intl.NumberFormat('en-IN')`
- Indian digit grouping (e.g. `₹1,09,900`, `₹12,34,56,789`)
- Displays zero decimals when the amount is a whole rupee (`₹29,999`)
- Displays exactly 2 decimals when fractional paise exist (`₹149.50`)
- Strictly rejects non-integer inputs with a `TypeError`.

---

## 5. Project Structure

```
vantry/
├── .github/workflows/ci.yml       # Automated GitHub Actions CI workflow
├── dist/                          # Production build output
├── public/                        # Static assets & favicons
├── src/
│   ├── components/                # Modular UI components
│   │   ├── CartDrawer.jsx         # LocalStorage cart drawer & quantity controls
│   │   ├── CategoryNav.jsx        # Category pills, in-stock toggle & sorting
│   │   ├── CheckoutModal.jsx      # Multi-step simulated Indian checkout & confirmation
│   │   ├── ComparisonDrawer.jsx   # Docked comparison queue tray (max 3 items)
│   │   ├── ComparisonModal.jsx    # Side-by-side spec matrix with diff highlight
│   │   ├── Footer.jsx             # Showroom trust pillars, contact & concierge
│   │   ├── Header.jsx             # Sticky navigation, search, wishlist & cart badges
│   │   ├── Hero.jsx               # Showroom manifesto & featured hardware teaser
│   │   ├── Price.jsx              # Tabular INR price display component
│   │   ├── ProductCard.jsx        # Dark premium showroom product card
│   │   ├── ProductDetailModal.jsx # Quick inspect full specifications modal
│   │   ├── SplitVLogo.jsx         # Custom vector Split V logo mark & wordmark
│   │   ├── StockBadge.jsx         # Accessible stock status (icon + text)
│   │   └── Toast.jsx              # Accessible status alerts (aria-live polite)
│   ├── config/
│   │   └── brand.js               # Brand metadata, positioning & showroom info
│   ├── context/
│   │   └── AppContext.jsx         # Central store for Cart, Wishlist, Compare & Toasts
│   ├── data/
│   │   └── products.js            # 16 realistic hardware products across 4 categories
│   ├── design/
│   │   ├── index.css              # Tailwind base, utilities, reduced motion
│   │   └── tokens.css             # Canonical CSS variable definitions
│   ├── lib/
│   │   └── format.js              # formatCurrency, formatNumber, formatCompact
│   ├── App.jsx                    # Primary application shell & filter orchestrator
│   └── main.jsx                   # React 18 DOM mount point
├── test/
│   ├── format.test.js             # Currency and numeric unit tests
│   └── products.test.js           # Catalogue integrity and brand tests
├── index.html                     # HTML root with typography preconnects
├── package.json                   # Scripts and dependencies
├── postcss.config.js              # PostCSS Tailwind plugin
├── tailwind.config.js             # Token mapping to Tailwind utility classes
├── vercel.json                    # Single-page-app rewrites & cache headers
└── vite.config.js                 # Vite bundler configuration
```

---

## 6. Development Scripts

```bash
# Start local dev server
npm run dev

# Run unit and catalogue integrity tests
npm test

# Run syntax/import verification
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
