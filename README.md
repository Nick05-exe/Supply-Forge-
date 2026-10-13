# SupplyForge — Version 3.0 (Minimalist Enterprise Edition)

A production-grade, minimalist Single Page Application (SPA) for **SupplyForge: Manage. Track. Supply.** built with enterprise UX standards, 8 foundational UI/UX laws, multi-role authentication, universal keyboard controls, and persistent state management.

> 📦 **Previous Version Archives**:
> - **Version 2.0 Archive**: Safely preserved in [`version_2/`](version_2/).
> - **Version 1.0 Archive**: Safely preserved in [`version_1/`](version_1/).

---

## ⚡ What's New in Version 3.0

1. **Universal Command Palette (`Ctrl + K` / `Cmd + K`)**:
   - Access from anywhere via `Ctrl + K` or the header button.
   - Quick search for materials, purchase orders, views, quick actions (*"Add Material"*, *"New PO"*, *"Auto-Reorder"*), and instant user profile switching with arrow key navigation.

2. **Obsidian Dark Mode (Terminal & Bloomberg Style)**:
   - Header toggle button (☀️ / 🌙) switching between minimal crisp light and deep obsidian dark mode (`#0B0F19`).
   - High-contrast preservation of custom brand colors: `#32de84` (Total Stock Green), `#FF5F1F` (Low Stock Orange), `#B0E0E6` (Selected Option), and `#0284C7` (Interactive Blue).
   - Preference saved automatically to `localStorage`.

3. **Data Persistence Engine (`localStorage`)**:
   - Modifying materials, issuing purchase orders, generating goods receipts, and recording stock movements automatically persist in browser storage.
   - Includes a *"Reset Demo State"* button in Settings and Audit Trail to restore original factory data at any time.

4. **1-Click Smart Auto-PO Generation**:
   - Triggerable from Low Stock widget, Alerts view, or Command Palette (`⚡ Auto-Generate POs`).
   - Automatically identifies materials below safety threshold, calculates order deficits, groups items by primary vendor, issues draft POs, and logs audit entries.

5. **Interactive 2D Warehouse Bay Floor Visualizer**:
   - Spatial visualizer for all 6 configured warehouse bays (*Central Depot Bay 1-2, Chemical Store Bay 3, East Hub Bay 4, Heavy Yard Bay 5, Packing Bay 6, Quarantine Bay 7*).
   - Real-time occupancy progress meters, storage capacities, supervisor tags, and 1-click bay inspection modal.

6. **Data Table Power Upgrades**:
   - **Column Sorting**: Click table headers (Material Name, SKU, Category, Location, Available, Unit Rate, Status) to sort ascending/descending.
   - **Pagination**: Clean footer with entries indicator and Previous / Next page controls.
   - **Checkbox Multi-Select**: Select individual or all rows to trigger the floating batch action bar (*"Bulk Reorder"*, *"Export Selection CSV"*).

7. **Vector Barcode Generator & 4×6" Thermal Bin Labels**:
   - Generates clean vector SVG barcodes for materials.
   - Printable 4x6" adhesive thermal shelf label preview with direct print driver support (`@media print`).

8. **Live Compliance Audit Trail Feed**:
   - Real-time chronological activity ledger tracking operations, quality inspections, PO authorizations, and automated reorders.

9. **CSV Bulk Importer**:
   - Drag-and-drop CSV importer modal to ingest material spreadsheets directly into the inventory catalog.

---

## 🔐 Authentication & Role-Based Profiles

- 👔 **Parv Vashistha**: Inventory Manager (Full Material & Facility Access)
- 📦 **Arun Akash**: QC Lead & Warehouse Supervisor (Inspection & Bay Transfers)
- 💼 **Aman Raj**: Procurement Specialist (Vendor Sourcing & Purchase Orders)

---

## 🎨 Design System & Color Palette

- **Total Stock / Success**: `#32de84` (Pantone Malachite)
- **Low Stock / Critical Alerts**: `#FF5F1F` (Neon Safety Orange)
- **Selected Navigation & Active Filters**: `#B0E0E6` (Powder Blue) with dark readable text (`#042F38`)
- **Interactive Accents & Highlights**: `#0284C7` / `#2563EB` (Electric Royal Blue)
- **Obsidian Dark Canvas**: `#0B0F19` with elevated card surface `#111827` and hairline borders `#1F2937`
- **Typography**: Plus Jakarta Sans
