/**
 * SupplyForge Master Application Data Store - Version 2
 * Enhanced with Multi-User Authentication, Role Profiles,
 * and WCAG 2.1 AA accessible status descriptors.
 */

const supplyForgeData = {
  // Available Demo User Profiles
  users: [
    {
      id: "usr-01",
      name: "Parv Vashistha",
      role: "Inventory Manager",
      email: "parv.vashistha@supplyforge.internal",
      avatar: "assets/illustrations/arjun-avatar.svg",
      initials: "PV",
      department: "Warehouse & Materials Control",
      date: "13 June 2025"
    },
    {
      id: "usr-02",
      name: "Arun Akash",
      role: "QC & Warehouse Lead",
      email: "arun.akash@supplyforge.internal",
      avatar: "assets/illustrations/arjun-avatar.svg",
      initials: "AA",
      department: "Quality Assurance & Inward Inspection",
      date: "13 June 2025"
    },
    {
      id: "usr-03",
      name: "Aman Raj",
      role: "Procurement Specialist",
      email: "aman.raj@supplyforge.internal",
      avatar: "assets/illustrations/arjun-avatar.svg",
      initials: "AR",
      department: "Strategic Sourcing & Vendor Mgmt",
      date: "13 June 2025"
    }
  ],

  // Currently Authenticated User (Defaults to null if on login screen, or Parv Vashistha upon sign-in)
  currentUser: null,

  // 1. Dashboard KPI Metrics
  kpis: [
    {
      id: "total-materials",
      label: "Total Materials",
      value: "152",
      subtext: "Active raw materials",
      iconType: "cube",
      colorClass: "blue",
      bgClass: "bg-blue-50",
      iconColor: "#2563EB",
      valueColor: "text-slate-900"
    },
    {
      id: "stock-value",
      label: "Total Stock Value",
      value: "₹ 2.45 Cr",
      subtext: "Across warehouses",
      iconType: "cubes",
      colorClass: "green",
      bgClass: "bg-[#32de84]/15 border border-[#32de84]/35",
      iconColor: "#32de84",
      valueColor: "text-[#1dbf6c]",
      customTextColor: "#24ba69"
    },
    {
      id: "low-stock",
      label: "Low Stock Items",
      value: "8",
      subtext: "Need urgent attention",
      iconType: "alert-triangle",
      colorClass: "orange",
      bgClass: "bg-[#FF5F1F]/15 border border-[#FF5F1F]/35",
      iconColor: "#FF5F1F",
      valueColor: "text-[#FF5F1F]",
      customTextColor: "#FF5F1F"
    },
    {
      id: "pending-orders",
      label: "Pending Orders",
      value: "6",
      subtext: "Worth ₹ 78.30 L",
      iconType: "shopping-cart",
      colorClass: "purple",
      bgClass: "bg-purple-50",
      iconColor: "#7C3AED",
      valueColor: "text-purple-700"
    },
    {
      id: "incoming-shipments",
      label: "Incoming Shipments",
      value: "3",
      subtext: "Expected this week",
      iconType: "truck",
      colorClass: "teal",
      bgClass: "bg-teal-50",
      iconColor: "#0D9488",
      valueColor: "text-teal-700"
    }
  ],

  // 2. Inventory Snapshot (Donut Chart & Breakdown)
  inventorySnapshot: {
    totalItems: 152,
    monthlyChange: "+12%",
    comparisonText: "vs last month",
    categories: [
      { name: "Raw Materials", count: 102, percentage: 67, color: "#32de84" },
      { name: "Consumables", count: 28, percentage: 18, color: "#0284C7" },
      { name: "Packing Materials", count: 15, percentage: 10, color: "#B0E0E6" },
      { name: "Others (Low Stock)", count: 7, percentage: 5, color: "#FF5F1F" }
    ]
  },

  // 3. Full Inventory Catalog (Master List with accessible badges)
  inventory: [
    {
      sku: "RAW-MS-001",
      name: "MS Steel Sheets",
      category: "Raw Materials",
      location: "Central Depot (Bay 1)",
      available: 120,
      minLevel: 500,
      unit: "Kg",
      unitPrice: 65,
      status: "Low Stock",
      statusIcon: "⚡",
      icon: "assets/illustrations/ms-steel-sheets.svg",
      lastRestocked: "02 Jun 2025"
    },
    {
      sku: "RAW-CU-002",
      name: "Copper Wire",
      category: "Raw Materials",
      location: "East Storage (Bay 4)",
      available: 80,
      minLevel: 300,
      unit: "Kg",
      unitPrice: 780,
      status: "Low Stock",
      statusIcon: "⚡",
      icon: "assets/illustrations/copper-wire.svg",
      lastRestocked: "28 May 2025"
    },
    {
      sku: "RAW-AL-003",
      name: "Aluminium Ingot",
      category: "Raw Materials",
      location: "Central Depot (Bay 2)",
      available: 45,
      minLevel: 200,
      unit: "Kg",
      unitPrice: 220,
      status: "Low Stock",
      statusIcon: "⚡",
      icon: "assets/illustrations/aluminium-ingot.svg",
      lastRestocked: "05 Jun 2025"
    },
    {
      sku: "CON-ZN-004",
      name: "Zinc Coating",
      category: "Consumables",
      location: "Chemical Store (Bay 3)",
      available: 10,
      minLevel: 50,
      unit: "Ltr",
      unitPrice: 450,
      status: "Critical",
      statusIcon: "⚠️",
      icon: "assets/illustrations/zinc-coating.svg",
      lastRestocked: "15 May 2025"
    },
    {
      sku: "RAW-BR-005",
      name: "Brass Hex Rods",
      category: "Raw Materials",
      location: "Central Depot (Bay 1)",
      available: 640,
      minLevel: 250,
      unit: "Kg",
      unitPrice: 510,
      status: "In Stock",
      statusIcon: "✓",
      icon: "assets/illustrations/copper-wire.svg",
      lastRestocked: "10 Jun 2025"
    },
    {
      sku: "RAW-CS-006",
      name: "Carbon Steel Seamless Pipe",
      category: "Raw Materials",
      location: "Heavy Yard (Bay 5)",
      available: 1250,
      minLevel: 400,
      unit: "Meters",
      unitPrice: 380,
      status: "In Stock",
      statusIcon: "✓",
      icon: "assets/illustrations/ms-steel-sheets.svg",
      lastRestocked: "08 Jun 2025"
    },
    {
      sku: "CON-LUB-007",
      name: "Hydraulic Oil ISO 68",
      category: "Consumables",
      location: "Chemical Store (Bay 3)",
      available: 420,
      minLevel: 150,
      unit: "Ltr",
      unitPrice: 210,
      status: "In Stock",
      statusIcon: "✓",
      icon: "assets/illustrations/zinc-coating.svg",
      lastRestocked: "01 Jun 2025"
    },
    {
      sku: "PCK-BOX-008",
      name: "Corrugated Export Cartons (5-Ply)",
      category: "Packing Materials",
      location: "Packing Bay (Bay 6)",
      available: 1800,
      minLevel: 500,
      unit: "Pieces",
      unitPrice: 42,
      status: "In Stock",
      statusIcon: "✓",
      icon: "assets/illustrations/sidebar-callout.svg",
      lastRestocked: "11 Jun 2025"
    },
    {
      sku: "PCK-STR-009",
      name: "Stretch Wrap Film Rolls",
      category: "Packing Materials",
      location: "Packing Bay (Bay 6)",
      available: 95,
      minLevel: 100,
      unit: "Rolls",
      unitPrice: 340,
      status: "Low Stock",
      statusIcon: "⚡",
      icon: "assets/illustrations/sidebar-callout.svg",
      lastRestocked: "20 May 2025"
    },
    {
      sku: "RAW-SS-010",
      name: "Stainless Steel 304 Coil",
      category: "Raw Materials",
      location: "Central Depot (Bay 1)",
      available: 820,
      minLevel: 300,
      unit: "Kg",
      unitPrice: 310,
      status: "In Stock",
      statusIcon: "✓",
      icon: "assets/illustrations/ms-steel-sheets.svg",
      lastRestocked: "09 Jun 2025"
    },
    {
      sku: "CON-GAS-011",
      name: "Industrial Argon Gas",
      category: "Consumables",
      location: "Cylinder Depot",
      available: 18,
      minLevel: 25,
      unit: "Cylinders",
      unitPrice: 1250,
      status: "Low Stock",
      statusIcon: "⚡",
      icon: "assets/illustrations/zinc-coating.svg",
      lastRestocked: "29 May 2025"
    },
    {
      sku: "OTH-SAF-012",
      name: "Kevlar Heat-Resistant Gloves",
      category: "Others",
      location: "Safety Locker",
      available: 350,
      minLevel: 100,
      unit: "Pairs",
      unitPrice: 180,
      status: "In Stock",
      statusIcon: "✓",
      icon: "assets/illustrations/sidebar-callout.svg",
      lastRestocked: "04 Jun 2025"
    }
  ],

  // 4. Low Stock Alerts (Filtered for Quick Cards)
  lowStockAlerts: [
    {
      id: "MAT-001",
      name: "MS Steel Sheets",
      available: 120,
      minLevel: 500,
      unit: "Kg",
      icon: "assets/illustrations/ms-steel-sheets.svg"
    },
    {
      id: "MAT-002",
      name: "Copper Wire",
      available: 80,
      minLevel: 300,
      unit: "Kg",
      icon: "assets/illustrations/copper-wire.svg"
    },
    {
      id: "MAT-003",
      name: "Aluminium Ingot",
      available: 45,
      minLevel: 200,
      unit: "Kg",
      icon: "assets/illustrations/aluminium-ingot.svg"
    },
    {
      id: "MAT-004",
      name: "Zinc Coating",
      available: 10,
      minLevel: 50,
      unit: "Ltr",
      icon: "assets/illustrations/zinc-coating.svg"
    }
  ],

  // 5. Suppliers Directory
  suppliers: [
    {
      id: "SUP-01",
      name: "ABC Metals Pvt. Ltd.",
      initial: "A",
      initialBg: "#EFF6FF",
      initialColor: "#2563EB",
      category: "Structural Steel & Plates",
      rating: 4.8,
      location: "Mumbai, Maharashtra",
      contactPerson: "Rajesh Sharma",
      phone: "+91 98201 44521",
      email: "orders@abcmetals.co.in",
      gstin: "27AABCA1234F1Z8",
      paymentTerms: "Net 30 Days",
      activeOrders: 2,
      totalSpend: "₹ 48.50 L",
      status: "Active & Certified"
    },
    {
      id: "SUP-02",
      name: "Shree Steel Corp.",
      initial: "S",
      initialBg: "#F0FDF4",
      initialColor: "#16A34A",
      category: "Stainless Steel & Coils",
      rating: 4.9,
      location: "Ahmedabad, Gujarat",
      contactPerson: "Kirit Patel",
      phone: "+91 97240 88912",
      email: "kirit@shreesteel.com",
      gstin: "24AABCS5678G2Z1",
      paymentTerms: "Net 45 Days",
      activeOrders: 1,
      totalSpend: "₹ 62.00 L",
      status: "Preferred Partner"
    },
    {
      id: "SUP-03",
      name: "Global Alloys",
      initial: "G",
      initialBg: "#FAF5FF",
      initialColor: "#7C3AED",
      category: "Aluminium & Non-Ferrous",
      rating: 4.7,
      location: "Pune, Maharashtra",
      contactPerson: "Vikram Deshmukh",
      phone: "+91 94220 33410",
      email: "vikram@globalalloys.in",
      gstin: "27AABCG9101H3Z4",
      paymentTerms: "Net 30 Days",
      activeOrders: 1,
      totalSpend: "₹ 35.20 L",
      status: "Active & Certified"
    },
    {
      id: "SUP-04",
      name: "Kaveri Enterprises",
      initial: "K",
      initialBg: "#FFF7ED",
      initialColor: "#EA580C",
      category: "Copper Wires & Electricals",
      rating: 4.5,
      location: "Chennai, Tamil Nadu",
      contactPerson: "S. Swaminathan",
      phone: "+91 98400 66723",
      email: "swami@kaverient.com",
      gstin: "33AABCK2345J4Z7",
      paymentTerms: "Net 15 Days",
      activeOrders: 1,
      totalSpend: "₹ 24.80 L",
      status: "Active"
    },
    {
      id: "SUP-05",
      name: "Mahalaxmi Metals",
      initial: "M",
      initialBg: "#F0F9FF",
      initialColor: "#0284C7",
      category: "Zinc, Galvanizing & Coatings",
      rating: 4.6,
      location: "Faridabad, Haryana",
      contactPerson: "Amit Gupta",
      phone: "+91 98110 55219",
      email: "sales@mahalaxmimetals.in",
      gstin: "06AABCM3456K5Z2",
      paymentTerms: "Net 30 Days",
      activeOrders: 1,
      totalSpend: "₹ 19.50 L",
      status: "Active"
    },
    {
      id: "SUP-06",
      name: "PacPrint Industries",
      initial: "P",
      initialBg: "#FEF2F2",
      initialColor: "#DC2626",
      category: "Industrial Packaging & Cartons",
      rating: 4.8,
      location: "Bhiwandi, Maharashtra",
      contactPerson: "Neha Merchant",
      phone: "+91 98205 11782",
      email: "neha@pacprint.in",
      gstin: "27AABCP7890L6Z9",
      paymentTerms: "Net 30 Days",
      activeOrders: 0,
      totalSpend: "₹ 14.30 L",
      status: "Active & Certified"
    }
  ],

  // 6. Purchase Orders Master List
  purchaseOrders: [
    {
      id: "PO-2025-125",
      vendor: "ABC Metals Pvt. Ltd.",
      itemsDesc: "MS Steel Sheets (500 Kg)",
      amount: "₹ 32,500",
      status: "Pending",
      statusIcon: "⏳",
      date: "18 Jun 2025",
      expectedDate: "25 Jun 2025",
      initial: "A",
      initialBg: "#EFF6FF",
      initialColor: "#2563EB",
      lineItems: [
        { name: "MS Steel Sheets 3mm", qty: "500 Kg", rate: "₹ 65", total: "₹ 32,500" }
      ]
    },
    {
      id: "PO-2025-124",
      vendor: "Shree Steel Corp.",
      itemsDesc: "SS 304 Coils (1,200 Kg)",
      amount: "₹ 3,72,000",
      status: "Approved",
      statusIcon: "✓",
      date: "16 Jun 2025",
      expectedDate: "23 Jun 2025",
      initial: "S",
      initialBg: "#F0FDF4",
      initialColor: "#16A34A",
      lineItems: [
        { name: "Stainless Steel 304 Coil", qty: "1,200 Kg", rate: "₹ 310", total: "₹ 3,72,000" }
      ]
    },
    {
      id: "PO-2025-123",
      vendor: "Global Alloys",
      itemsDesc: "Aluminium Ingot 99.7% (800 Kg)",
      amount: "₹ 1,76,000",
      status: "Dispatched",
      statusIcon: "🚚",
      date: "14 Jun 2025",
      expectedDate: "19 Jun 2025",
      initial: "G",
      initialBg: "#FAF5FF",
      initialColor: "#7C3AED",
      lineItems: [
        { name: "Aluminium Ingot 99.7%", qty: "800 Kg", rate: "₹ 220", total: "₹ 1,76,000" }
      ]
    },
    {
      id: "PO-2025-122",
      vendor: "Kaveri Enterprises",
      itemsDesc: "Copper Wire 4mm (400 Kg)",
      amount: "₹ 3,12,000",
      status: "Pending",
      statusIcon: "⏳",
      date: "20 Jun 2025",
      expectedDate: "28 Jun 2025",
      initial: "K",
      initialBg: "#FFF7ED",
      initialColor: "#EA580C",
      lineItems: [
        { name: "Copper Wire 4mm", qty: "400 Kg", rate: "₹ 780", total: "₹ 3,12,000" }
      ]
    },
    {
      id: "PO-2025-121",
      vendor: "Mahalaxmi Metals",
      itemsDesc: "Zinc Liquid Coating (200 Ltr)",
      amount: "₹ 90,000",
      status: "Approved",
      statusIcon: "✓",
      date: "17 Jun 2025",
      expectedDate: "24 Jun 2025",
      initial: "M",
      initialBg: "#F0F9FF",
      initialColor: "#0284C7",
      lineItems: [
        { name: "Zinc Coating Liquid", qty: "200 Ltr", rate: "₹ 450", total: "₹ 90,000" }
      ]
    },
    {
      id: "PO-2025-120",
      vendor: "PacPrint Industries",
      itemsDesc: "Corrugated Cartons & Stretch Wrap",
      amount: "₹ 54,000",
      status: "Delivered",
      statusIcon: "📦",
      date: "10 Jun 2025",
      expectedDate: "14 Jun 2025",
      initial: "P",
      initialBg: "#FEF2F2",
      initialColor: "#DC2626",
      lineItems: [
        { name: "Corrugated Export Cartons", qty: "1,000 Pcs", rate: "₹ 42", total: "₹ 42,000" },
        { name: "Stretch Wrap Film Rolls", qty: "35 Rolls", rate: "₹ 342", total: "₹ 12,000" }
      ]
    }
  ],

  // 7. Goods Receipt (GRN) Records
  goodsReceipts: [
    {
      grnNumber: "GRN-2025-412",
      poNumber: "PO-2025-120",
      vendor: "PacPrint Industries",
      itemsReceived: "Corrugated Cartons (1,000 Pcs) + Film (35 Rolls)",
      receivingBay: "Packing Bay (Bay 6)",
      receivedDate: "14 Jun 2025",
      qcStatus: "Passed",
      inspector: "Arun Akash",
      invoiceRef: "INV-PP-8821"
    },
    {
      grnNumber: "GRN-2025-411",
      poNumber: "PO-2025-118",
      vendor: "Shree Steel Corp.",
      itemsReceived: "Stainless Steel Sheets 2mm (850 Kg)",
      receivingBay: "Central Depot (Bay 1)",
      receivedDate: "11 Jun 2025",
      qcStatus: "Passed",
      inspector: "Parv Vashistha",
      invoiceRef: "INV-SS-4912"
    },
    {
      grnNumber: "GRN-2025-410",
      poNumber: "PO-2025-115",
      vendor: "ABC Metals Pvt. Ltd.",
      itemsReceived: "MS Angles & Channels (1,400 Kg)",
      receivingBay: "Heavy Yard (Bay 5)",
      receivedDate: "06 Jun 2025",
      qcStatus: "Partial Reject",
      inspector: "Arun Akash",
      invoiceRef: "INV-ABC-1029"
    }
  ],

  // 8. Stock Movements & Inter-Warehouse Transfers
  stockMovements: [
    {
      transferId: "TR-2025-089",
      material: "MS Steel Sheets",
      quantity: "380 Kg",
      fromLocation: "Central Depot (Bay 1)",
      toLocation: "Production Fabrication Line 2",
      timestamp: "13 Jun 2025, 10:45 AM",
      requestedBy: "Arun Akash (QC & Bay Sup.)",
      status: "Completed"
    },
    {
      transferId: "TR-2025-088",
      material: "Hydraulic Oil ISO 68",
      quantity: "60 Ltr",
      fromLocation: "Chemical Store (Bay 3)",
      toLocation: "CNC Machining Center Bay",
      timestamp: "12 Jun 2025, 03:15 PM",
      requestedBy: "Prakash Jha (Maintenance)",
      status: "Completed"
    },
    {
      transferId: "TR-2025-087",
      material: "Copper Wire 4mm",
      quantity: "150 Kg",
      fromLocation: "East Storage (Bay 4)",
      toLocation: "Coil Winding Department",
      timestamp: "11 Jun 2025, 09:20 AM",
      requestedBy: "Aman Raj (Procurement)",
      status: "Completed"
    },
    {
      transferId: "TR-2025-086",
      material: "Corrugated Export Cartons",
      quantity: "400 Pieces",
      fromLocation: "Packing Bay (Bay 6)",
      toLocation: "Final Assembly Staging",
      timestamp: "10 Jun 2025, 02:00 PM",
      requestedBy: "Parv Vashistha (Inventory Mgr)",
      status: "Completed"
    }
  ],

  // 9. Quick Actions configuration
  quickActions: [
    {
      id: "create-po",
      label: "Create\nPurchase Order",
      icon: "shopping-cart-plus",
      bgClass: "bg-blue-100",
      hoverBg: "hover:bg-blue-200",
      textColor: "text-blue-700",
      modalId: "modal-create-po"
    },
    {
      id: "create-pr",
      label: "Create\nPurchase Request",
      icon: "file-plus",
      bgClass: "bg-emerald-100",
      hoverBg: "hover:bg-emerald-200",
      textColor: "text-emerald-700",
      modalId: "modal-create-pr"
    },
    {
      id: "add-material",
      label: "Add New\nMaterial",
      icon: "box",
      bgClass: "bg-orange-100",
      hoverBg: "hover:bg-orange-200",
      textColor: "text-orange-700",
      modalId: "modal-add-material"
    },
    {
      id: "stock-movement",
      label: "Stock\nMovement",
      icon: "repeat",
      bgClass: "bg-purple-100",
      hoverBg: "hover:bg-purple-200",
      textColor: "text-purple-700",
      modalId: "modal-stock-movement"
    },
    {
      id: "goods-receipt",
      label: "Goods\nReceipt",
      icon: "truck",
      bgClass: "bg-teal-100",
      hoverBg: "hover:bg-teal-200",
      textColor: "text-teal-700",
      modalId: "modal-goods-receipt"
    },
    {
      id: "view-reports",
      label: "View\nReports",
      icon: "bar-chart-2",
      bgClass: "bg-rose-100",
      hoverBg: "hover:bg-rose-200",
      textColor: "text-rose-700",
      modalId: "modal-view-reports"
    }
  ],

  // 10. Reports & Analytics Datasets
  reports: {
    monthlySpend: "₹ 2.45 Cr",
    activeVendors: 14,
    shipmentsReceived: 38,
    onTimeDeliveryRate: "94.2%",
    monthlyTrend: [
      { month: "Jan", spend: 1.85 },
      { month: "Feb", spend: 2.10 },
      { month: "Mar", spend: 2.35 },
      { month: "Apr", spend: 2.05 },
      { month: "May", spend: 2.28 },
      { month: "Jun", spend: 2.45 }
    ]
  },

  // 11. System Settings & Plant Profile
  settings: {
    plantName: "SupplyForge Manufacturing Plant 01",
    gstin: "27AAACF4412K1ZA",
    address: "Plot 42, Industrial Area Phase II, Chakan, Pune - 410501",
    currency: "₹ (INR)",
    warehouses: [
      { name: "Central Depot (Bay 1 & 2)", type: "Raw Steel & Alloys", capacity: "85% Full" },
      { name: "East Storage Hub (Bay 4)", type: "Electrical & Wire Spools", capacity: "62% Full" },
      { name: "Chemical & Hazardous Store (Bay 3)", type: "Coatings & Oils", capacity: "44% Full" },
      { name: "Packaging & Dispatch Bay (Bay 6)", type: "Cartons & Films", capacity: "78% Full" }
    ],
    thresholdNotification: true,
    dailyDigest: true,
    autoApprovePOUnder: "₹ 50,000"
  },

  // 12. In-App Notifications
  notifications: [
    {
      id: 1,
      title: "Critical Low Stock: Zinc Coating",
      desc: "Only 10 Ltr left (Minimum safe threshold: 50 Ltr).",
      time: "10 mins ago",
      type: "alert"
    },
    {
      id: 2,
      title: "PO-2025-123 Dispatched",
      desc: "Global Alloys has dispatched 800 Kg Aluminium Ingot.",
      time: "1 hour ago",
      type: "shipping"
    },
    {
      id: 3,
      title: "Shipment Due Tomorrow",
      desc: "Shree Steel Corp delivery expected at Warehouse Bay 4.",
      time: "3 hours ago",
      type: "info"
    }
  ],

  // 13. Warehouse Bays Visualizer Dataset (v3.0)
  warehouseBays: [
    {
      id: "BAY-01",
      name: "Central Depot (Bay 1 & 2)",
      tag: "Raw Steel & Heavy Alloys",
      occupiedPercent: 85,
      capacity: "50,000 Kg",
      currentLoad: "42,500 Kg",
      itemsCount: 42,
      color: "#32de84",
      status: "Optimal",
      supervisor: "Parv Vashistha"
    },
    {
      id: "BAY-03",
      name: "Chemical Store (Bay 3)",
      tag: "Coatings, Oils & Gases",
      occupiedPercent: 88,
      capacity: "10,000 Ltr",
      currentLoad: "8,800 Ltr",
      itemsCount: 18,
      color: "#FF5F1F",
      status: "High Density",
      supervisor: "Arun Akash"
    },
    {
      id: "BAY-04",
      name: "East Storage Hub (Bay 4)",
      tag: "Copper Wire & Hardware",
      occupiedPercent: 62,
      capacity: "20,000 Kg",
      currentLoad: "12,400 Kg",
      itemsCount: 35,
      color: "#0284C7",
      status: "Normal",
      supervisor: "Arun Akash"
    },
    {
      id: "BAY-05",
      name: "Heavy Yard (Bay 5)",
      tag: "Structural Beams & Angles",
      occupiedPercent: 74,
      capacity: "40,000 Kg",
      currentLoad: "29,600 Kg",
      itemsCount: 28,
      color: "#32de84",
      status: "Normal",
      supervisor: "Parv Vashistha"
    },
    {
      id: "BAY-06",
      name: "Packing & Dispatch (Bay 6)",
      tag: "Export Cartons & Stretch Film",
      occupiedPercent: 50,
      capacity: "15,000 Units",
      currentLoad: "7,500 Units",
      itemsCount: 19,
      color: "#B0E0E6",
      status: "Spacious",
      supervisor: "Aman Raj"
    },
    {
      id: "BAY-07",
      name: "Inward QC Hold (Bay 7)",
      tag: "Quarantine & Pending Inspection",
      occupiedPercent: 24,
      capacity: "5,000 Kg",
      currentLoad: "1,200 Kg",
      itemsCount: 10,
      color: "#0284C7",
      status: "Under Inspection",
      supervisor: "Arun Akash"
    }
  ],

  // 14. Live Compliance Audit Trail (v3.0)
  auditLogs: [
    {
      id: "LOG-108",
      timestamp: "07 Sep 2026, 00:15",
      user: "Parv Vashistha",
      initials: "PV",
      action: "Workspace Upgrade",
      badgeClass: "badge-approved",
      description: "SupplyForge upgraded to Version 3.0 (Minimalist Enterprise Edition)."
    },
    {
      id: "LOG-107",
      timestamp: "06 Sep 2026, 21:40",
      user: "Arun Akash",
      initials: "AA",
      action: "QC Passed",
      badgeClass: "badge-in-stock",
      description: "GRN-2025-412 verified: 1,000 Pcs Export Cartons assigned to Packing Bay (Bay 6)."
    },
    {
      id: "LOG-106",
      timestamp: "06 Sep 2026, 17:15",
      user: "Aman Raj",
      initials: "AR",
      action: "PO Issued",
      badgeClass: "badge-dispatched",
      description: "PO-2025-125 issued to ABC Metals Pvt. Ltd. for ₹ 32,500."
    },
    {
      id: "LOG-105",
      timestamp: "06 Sep 2026, 14:05",
      user: "Parv Vashistha",
      initials: "PV",
      action: "Low Stock Alert",
      badgeClass: "badge-critical",
      description: "Zinc Coating threshold alert triggered (10 Ltr remaining vs. 50 Ltr minimum)."
    },
    {
      id: "LOG-104",
      timestamp: "05 Sep 2026, 11:30",
      user: "Arun Akash",
      initials: "AA",
      action: "Stock Movement",
      badgeClass: "badge-pending",
      description: "Transferred 380 Kg MS Steel Sheets from Central Depot to Production Bay 2."
    }
  ]
};

// Factory Reset Helper
window.getFreshDemoData = function() {
  return JSON.parse(JSON.stringify(supplyForgeData));
};

window.supplyForgeData = supplyForgeData;
