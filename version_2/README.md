# SupplyForge — Version 2.0 (Enterprise Inventory & Procurement Platform)

A responsive, multi-module Single Page Application (SPA) for **SupplyForge: Manage. Track. Supply.** built with enterprise UX standards, 8 foundational UI/UX laws, multi-role authentication, and full single-page routing.

> **Version 1 Archive**: The complete previous version is safely preserved in [`version_1/`](version_1/).

---

## 🔐 Authentication & Role-Based Profiles

SupplyForge 2.0 introduces an enterprise authentication split-screen portal (`#login`):
- **1-Click Instant Demo Profiles**:
  - 👔 **Parv Vashistha**: Inventory Manager (Full Material & Facility Access)
  - 📦 **Arun Akash**: QC Lead & Warehouse Supervisor (Inspection & Bay Transfers)
  - 💼 **Aman Raj**: Procurement Specialist (Vendor Sourcing & Purchase Orders)
- **Workstation Security**: Show/hide password eye toggle, credential validation, "Remember me" session persistence, and instant role hot-switching from the user profile dropdown.

---

## 🎨 Applied UI/UX Laws & Design Principles

1. **Fitts’s Law**:
   - All interactive controls (buttons, quick actions, inputs, nav items) have a guaranteed minimum hit target of **44×44px** (`.btn-touch`).
   - Primary action buttons (*Sign In*, *1-Click Reorder*, *+ New PO*) have large dimensions, high visual weight, and prominent placement.

2. **Hick’s Law**:
   - Reduced cognitive friction and decision fatigue.
   - 1-click demo buttons allow immediate evaluation without credential entry.
   - Categorical tab filters (*Raw Materials, Consumables, Packing, Others*) let users isolate items in one tap.

3. **Jakob’s Law**:
   - Familiar mental models: standard top-header global search, notification center with count badge, left sidebar with recognizable icons.
   - Keyboard shortcuts: press `/` anywhere to focus search, press `Escape` to close any modal.

4. **Gestalt Principles**:
   - **Proximity**: Closely related elements (KPI numbers, delta indicators, and subtext) are visually clustered.
   - **Similarity**: Standardized card borders, uniform pill shapes, and aligned typography.
   - **Enclosure (Common Region)**: Clear card boundaries (`rounded-2xl` with subtle border and elevation) demarcate distinct data views.
   - **Alignment**: Strict 12-column grid alignment across all cards and forms.

5. **Von Restorff Effect (Salience / Isolation)**:
   - Critical items (e.g. *Zinc Coating 10 Ltr*) feature a distinct visual badge, pulsing warning indicator (`.pulse-alert`), and high-contrast reorder buttons that immediately stand out from neutral items.

6. **Aesthetic-Usability Effect**:
   - Deep polished dark theme for Login hero with subtle ambient glow and geometric grid.
   - Premium *Plus Jakarta Sans* font hierarchy, smooth transitions (`0.2s cubic-bezier`), hover lift effects, and custom rounded scrollbars.

7. **Miller’s Law**:
   - Data is chunked into manageable groups of 5–7 items (5 KPI cards, 3 detail cards, 6 quick actions) rather than overwhelming users with raw density.
   - Complex forms are divided into 2-column fieldsets with clear section subheadings.

8. **Accessibility Principles (WCAG 2.1 AA)**:
   - All text maintains a minimum **4.5:1 contrast ratio** against backgrounds.
   - **Non-color reliance**: Status badges combine both explicit text and distinct iconography (`⚠️ Critical`, `⚡ Low Stock`, `✓ In Stock`, `⏳ Pending`, `🚚 Dispatched`).
   - Visible outline focus rings (`focus-visible:ring-2 focus-visible:ring-blue-600`) for all keyboard navigators.

---

## 🌟 Modules & Features

1. **Enterprise Login Page (`#login`)**: Split-screen branding, demo roles, credential login, password visibility toggle.
2. **Home Dashboard (`#home`)**: 5 KPI metrics, side-by-side SVG arc Donut Chart, recent POs, low stock alerts, quick actions.
3. **Inventory Master Catalog (`#inventory`)**: Category filter tabs, live SKU search, unit pricing, 1-click CSV export, Add Material wizard.
4. **Suppliers Directory (`#suppliers`)**: Vendor cards with star ratings, total spend, GSTIN, payment terms, and direct PO creation.
5. **Purchase Orders Lifecycle (`#purchase-orders`)**: Status filters, 1-click approval workflow, itemized PO slip invoice preview.
6. **Goods Receipt Notes (GRN) (`#goods-receipt`)**: Consignment tracking, QC status checks, PDF slip generation.
7. **Stock Movements (`#stock-movements`)**: Internal warehouse transfer log and inter-bay movement form.
8. **Reports & Analytics (`#reports`)**: Monthly spend velocity, interactive SVG bar chart, and download center.
9. **Alerts & Thresholds (`#alerts`)**: Critical low-stock monitoring with 1-click replenishment triggers.
10. **Plant Settings (`#settings`)**: Facility profile, warehouse bay configurations, and approval limits.

---

## 🚀 How to Run

The local development server is running at:
👉 **[http://localhost:8000/?v=6#login](http://localhost:8000/?v=6#login)**

To restart the server manually:
```powershell
python -m http.server 8000
```
