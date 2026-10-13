/**
 * SupplyForge Master Application Controller - Version 2
 * Integrates Authentication System, Role Switching (Parv Vashistha, Arun Akash, Aman Raj),
 * Full SPA Routing, and Strict Enforcement of 8 UI/UX Laws:
 * 1. Fitts's Law (Accessible 44px+ hit areas, prominent CTAs)
 * 2. Hick's Law (Progressive disclosure, 1-click demo logins)
 * 3. Jakob's Law (Familiar shortcuts, search '/', modal ESC, standard forms)
 * 4. Gestalt Principles (Proximity, similarity, common regions)
 * 5. Von Restorff Effect (High salience critical alerts with pulsing badges)
 * 6. Aesthetic-Usability Effect (Polished micro-interactions, smooth transitions)
 * 7. Miller's Law (Chunked informational hierarchy 7±2 items)
 * 8. Accessibility (WCAG 2.1 AA contrast, visible focus rings, multi-modal status)
 */

let currentInvCategory = 'All';
let currentPOStatus = 'All';

document.addEventListener('DOMContentLoaded', () => {
  const data = window.supplyForgeData;

  // 1. Initialize Auth State
  initAuth(data);

  // 2. Initialize Home Dashboard Components
  initKPICards(data.kpis);
  initInventorySnapshot(data.inventorySnapshot);
  initPurchaseOrders(data.purchaseOrders);
  initLowStockAlerts(data.lowStockAlerts);
  initQuickActions(data.quickActions);
  initNotifications(data.notifications);

  // 3. Initialize All Modular Views
  renderInventoryView();
  renderSuppliersView();
  renderPurchaseOrdersView();
  renderGoodsReceiptView();
  renderStockMovementsView();
  renderReportsView();
  renderAlertsView();

  // 4. Setup Global Interaction Handlers & Shortcuts
  setupSearch(data);
  setupDropdowns();
  setupModals();
  setupForms();
  setupKeyboardShortcuts();

  // 5. Initialize Routing from Hash
  const initialHash = window.location.hash.replace('#', '') || 'login';
  
  if (data.currentUser) {
    navigateTo(initialHash === 'login' ? 'home' : initialHash, false);
    if (initialHash === 'home' || initialHash === 'login') {
      animateCounters();
    }
  } else {
    showLoginView();
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (!window.supplyForgeData.currentUser && hash !== 'login') {
      showLoginView();
      return;
    }
    navigateTo(hash, false);
  });
});

// ============================================================
// 1. AUTHENTICATION & ROLE MANAGEMENT (Parv, Arun, Aman)
// ============================================================
function initAuth(data) {
  renderDemoUsers(data.users);

  // Check existing session
  const storedUser = sessionStorage.getItem('supplyforge_auth_user');
  if (storedUser) {
    try {
      data.currentUser = JSON.parse(storedUser);
      updateUserUI(data.currentUser);
    } catch (e) {
      data.currentUser = null;
    }
  } else {
    // Default to Parv Vashistha pre-selected for convenience (Hick's Law)
    selectDemoUser('usr-01');
  }
}

function renderDemoUsers(users) {
  const container = document.getElementById('demo-users-container');
  if (!container) return;

  container.innerHTML = users.map((u, index) => `
    <button
      type="button"
      onclick="selectDemoUser('${u.id}')"
      class="demo-account-card p-2.5 rounded-xl border border-slate-200 text-left flex flex-col justify-between min-h-[76px] focus:outline-none ${index === 0 ? 'active' : ''}"
      id="demo-btn-${u.id}"
    >
      <div class="flex items-center justify-between">
        <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">${u.initials}</span>
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tight">${u.id === 'usr-01' ? 'Admin' : u.id === 'usr-02' ? 'QC Lead' : 'Sourcing'}</span>
      </div>
      <div class="mt-1">
        <div class="text-xs font-bold text-slate-800 truncate">${u.name}</div>
        <div class="text-[10px] text-slate-400 truncate">${u.role}</div>
      </div>
    </button>
  `).join('');
}

function selectDemoUser(userId) {
  const user = window.supplyForgeData.users.find(u => u.id === userId);
  if (!user) return;

  document.querySelectorAll('.demo-account-card').forEach(c => c.classList.remove('active'));
  const btn = document.getElementById(`demo-btn-${userId}`);
  if (btn) btn.classList.add('active');

  const emailInput = document.getElementById('login-email');
  if (emailInput) emailInput.value = user.email;

  const passInput = document.getElementById('login-password');
  if (passInput) passInput.value = "DemoPass2025";
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  
  // Find matching user or fallback to Parv Vashistha
  let matchedUser = window.supplyForgeData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!matchedUser) {
    matchedUser = window.supplyForgeData.users[0]; // Parv Vashistha
  }

  const btn = document.getElementById('btn-login-submit');
  const btnText = document.getElementById('login-btn-text');
  const btnIcon = document.getElementById('login-btn-icon');

  if (btn) {
    btn.disabled = true;
    if (btnText) btnText.textContent = "Authenticating...";
    if (btnIcon) btnIcon.innerHTML = `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="32" stroke-linecap="round" class="animate-spin"></circle>`;
  }

  setTimeout(() => {
    loginAs(matchedUser);
    if (btn) {
      btn.disabled = false;
      if (btnText) btnText.textContent = "Sign In to SupplyForge";
      if (btnIcon) btnIcon.innerHTML = `<path d="M5 12h14M12 5l7 7-7 7"/>`;
    }
  }, 350);
}

function loginAs(user) {
  window.supplyForgeData.currentUser = user;
  sessionStorage.setItem('supplyforge_auth_user', JSON.stringify(user));
  updateUserUI(user);

  const loginView = document.getElementById('view-login');
  const appShell = document.getElementById('app-shell');

  if (loginView) loginView.classList.add('hidden');
  if (appShell) appShell.classList.remove('hidden');

  navigateTo('home');
  showToast(`Welcome back, ${user.name}! (${user.role})`, 'success');
}

function logout() {
  window.supplyForgeData.currentUser = null;
  sessionStorage.removeItem('supplyforge_auth_user');
  showLoginView();
  showToast('Logged out securely.', 'info');
}

function showLoginView() {
  const loginView = document.getElementById('view-login');
  const appShell = document.getElementById('app-shell');

  if (loginView) loginView.classList.remove('hidden');
  if (appShell) appShell.classList.add('hidden');
  window.location.hash = 'login';
}

function switchUser(userId) {
  const user = window.supplyForgeData.users.find(u => u.id === userId);
  if (user) {
    window.supplyForgeData.currentUser = user;
    sessionStorage.setItem('supplyforge_auth_user', JSON.stringify(user));
    updateUserUI(user);
    document.getElementById('user-dropdown')?.classList.add('hidden');
    showToast(`Switched active profile to: ${user.name} (${user.role})`, 'success');
  }
}

function updateUserUI(user) {
  const greetingEl = document.getElementById('greeting-user-name');
  if (greetingEl) greetingEl.textContent = user.name.split(' ')[0];

  const headerName = document.getElementById('header-user-name');
  if (headerName) headerName.textContent = user.name;

  const headerRole = document.getElementById('header-user-role');
  if (headerRole) headerRole.textContent = user.role;

  const dropName = document.getElementById('dropdown-user-name');
  if (dropName) dropName.textContent = user.name;

  const dropEmail = document.getElementById('dropdown-user-email');
  if (dropEmail) dropEmail.textContent = user.email;
}

function togglePasswordVisibility() {
  const passInput = document.getElementById('login-password');
  const eyeIcon = document.getElementById('eye-icon');
  if (!passInput) return;

  if (passInput.type === 'password') {
    passInput.type = 'text';
    if (eyeIcon) {
      eyeIcon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      `;
    }
  } else {
    passInput.type = 'password';
    if (eyeIcon) {
      eyeIcon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      `;
    }
  }
}

// ============================================================
// 2. SPA ROUTING ENGINE
// ============================================================
function navigateTo(viewName, updateHash = true) {
  const validViews = ['home', 'inventory', 'procurement', 'suppliers', 'purchase-orders', 'goods-receipt', 'stock-movements', 'reports', 'alerts', 'settings'];
  
  let targetView = viewName;
  if (targetView === 'procurement') targetView = 'purchase-orders';

  if (!validViews.includes(targetView)) {
    targetView = 'home';
  }

  // 1. Hide all page views
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.add('hidden');
  });

  // 2. Show target view
  const activeSection = document.getElementById(`view-${targetView}`);
  if (activeSection) {
    activeSection.classList.remove('hidden');
  }

  // 3. Update sidebar active links
  document.querySelectorAll('#sidebar-nav .nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-view') === targetView) {
      item.classList.add('active');
    }
  });

  // 4. Update window hash
  if (updateHash) {
    window.location.hash = targetView;
  }

  // 5. Reset scroll
  window.scrollTo(0, 0);
  document.querySelector('main')?.scrollTo(0, 0);

  // 6. View-specific refresh
  if (targetView === 'inventory') renderInventoryView();
  if (targetView === 'suppliers') renderSuppliersView();
  if (targetView === 'purchase-orders') renderPurchaseOrdersView();
  if (targetView === 'goods-receipt') renderGoodsReceiptView();
  if (targetView === 'stock-movements') renderStockMovementsView();
  if (targetView === 'reports') renderReportsView();
  if (targetView === 'alerts') renderAlertsView();
  if (targetView === 'home') {
    initKPICards(window.supplyForgeData.kpis);
    initInventorySnapshot(window.supplyForgeData.inventorySnapshot);
    initPurchaseOrders(window.supplyForgeData.purchaseOrders);
    initLowStockAlerts(window.supplyForgeData.lowStockAlerts);
    animateCounters();
  }
}

// ============================================================
// 3. DASHBOARD INITIALIZERS (Gestalt & Aesthetic-Usability)
// ============================================================
function initKPICards(kpis) {
  const container = document.getElementById('kpi-container');
  if (!container) return;

  container.innerHTML = kpis.map((kpi, index) => {
    let iconSvg = '';
    if (kpi.iconType === 'cube') {
      iconSvg = `
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="${kpi.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>`;
    } else if (kpi.iconType === 'cubes') {
      iconSvg = `
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="${kpi.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v8.42a1.78 1.78 0 0 0 .9 1.55l8.95 5.16"/>
          <polyline points="3.29 7 12 12 20.71 7"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>`;
    } else if (kpi.iconType === 'alert-triangle') {
      iconSvg = `
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="${kpi.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>`;
    } else if (kpi.iconType === 'shopping-cart') {
      iconSvg = `
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="${kpi.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>`;
    } else if (kpi.iconType === 'truck') {
      iconSvg = `
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="${kpi.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 17h4V5H2v12h3"/>
          <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/>
          <circle cx="7.5" cy="17.5" r="2.5"/>
          <circle cx="17.5" cy="17.5" r="2.5"/>
        </svg>`;
    }

    const staggerClass = `anim-stagger-${index + 1}`;

    return `
      <div class="dashboard-card kpi-card ${staggerClass} p-5 flex items-center gap-4 cursor-pointer hover:border-slate-400 btn-touch group" onclick="navigateTo('${kpi.id === 'low-stock' ? 'alerts' : kpi.id === 'pending-orders' ? 'purchase-orders' : 'inventory'}')">
        <div class="w-13 h-13 rounded-2xl ${kpi.bgClass} kpi-icon-box flex items-center justify-center flex-shrink-0 p-3 shadow-xs">
          ${iconSvg}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[12px] font-semibold text-slate-600 mb-0.5">${kpi.label}</div>
          <div id="kpi-num-${index}" class="text-[22px] font-extrabold ${kpi.valueColor} tracking-tight leading-tight group-hover:scale-105 transition-transform origin-left" ${kpi.customTextColor ? `style="color: ${kpi.customTextColor};"` : ''}>${kpi.value}</div>
          <div class="text-[11.5px] text-slate-500 font-medium mt-0.5 truncate">${kpi.subtext}</div>
        </div>
      </div>
    `;
  }).join('');
}

function initInventorySnapshot(snapshot) {
  const totalDisplay = document.getElementById('dashboard-total-items');
  if (totalDisplay) totalDisplay.textContent = snapshot.totalItems;

  if (window.renderInventoryChart) {
    window.renderInventoryChart('inventory-chart-container', snapshot);
  }

  const legendContainer = document.getElementById('inventory-legend');
  if (!legendContainer) return;

  legendContainer.innerHTML = snapshot.categories.map(cat => `
    <div class="flex items-center justify-between py-1 text-xs">
      <div class="flex items-center gap-2.5">
        <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${cat.color}; box-shadow: 0 0 6px ${cat.color}99;"></span>
        <span class="text-slate-700 font-medium">${cat.name}</span>
      </div>
      <span class="text-slate-600 font-semibold">${cat.count} (${cat.percentage}%)</span>
    </div>
  `).join('');
}

function initPurchaseOrders(orders) {
  const container = document.getElementById('purchase-orders-list');
  if (!container) return;

  const displayOrders = orders.slice(0, 5);

  container.innerHTML = displayOrders.map(po => {
    let badgeClass = 'badge-pending';
    if (po.status === 'Approved') badgeClass = 'badge-approved';
    if (po.status === 'Dispatched') badgeClass = 'badge-dispatched';
    if (po.status === 'Delivered') badgeClass = 'badge-delivered';

    return `
      <div class="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group btn-touch" onclick="openPOSlip('${po.id}')">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style="background-color: ${po.initialBg}; color: ${po.initialColor}">
            ${po.initial}
          </div>
          <div class="min-w-0">
            <div class="font-semibold text-slate-800 text-[13px] group-hover:text-blue-600 transition-colors">${po.id}</div>
            <div class="text-xs text-slate-500 truncate">${po.vendor}</div>
          </div>
        </div>
        <div class="text-right flex-shrink-0 pl-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${badgeClass}">
            <span>${po.statusIcon || '•'}</span> ${po.status}
          </span>
          <div class="text-[11px] text-slate-400 mt-1">${po.date}</div>
        </div>
      </div>
    `;
  }).join('');
}

function initLowStockAlerts(alerts) {
  const container = document.getElementById('low-stock-list');
  if (!container) return;

  container.innerHTML = alerts.map(item => `
    <div class="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group btn-touch" onclick="navigateTo('alerts')">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-11 h-11 rounded-xl bg-orange-50/70 border border-orange-200/60 flex items-center justify-center p-1.5 flex-shrink-0 group-hover:scale-105 transition-transform ${item.available <= 15 ? 'pulse-alert' : ''}">
          <img src="${item.icon}" alt="${item.name}" class="w-full h-full object-contain" />
        </div>
        <div class="min-w-0">
          <div class="font-semibold text-slate-800 text-[13px] group-hover:text-blue-600 transition-colors">${item.name}</div>
          <div class="text-xs text-slate-500">
            Available: <span class="font-extrabold" style="color: #FF5F1F;">${item.available} ${item.unit}</span>
          </div>
        </div>
      </div>
      <div class="text-right flex-shrink-0 pl-2">
        <div class="text-[11px] text-slate-400">Min. Level</div>
        <div class="text-xs font-semibold text-slate-700">${item.minLevel} ${item.unit}</div>
      </div>
    </div>
  `).join('');
}

function initQuickActions(actions) {
  const container = document.getElementById('quick-actions-container');
  if (!container) return;

  const iconMap = {
    'shopping-cart-plus': `
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>`,
    'file-plus': `
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>`,
    'box': `
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>`,
    'repeat': `
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>`,
    'truck': `
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 17h4V5H2v12h3"/>
        <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/>
        <circle cx="7.5" cy="17.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>`,
    'bar-chart-2': `
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>`
  };

  container.innerHTML = actions.map(act => `
    <button
      class="flex flex-col items-center group focus:outline-none btn-touch quick-action-item"
      onclick="openModal('${act.modalId}')"
      aria-label="${act.label.replace('\n', ' ')}"
    >
      <div class="w-14 h-14 rounded-full ${act.bgClass} ${act.textColor} quick-action-bubble flex items-center justify-center shadow-xs mb-2.5">
        ${iconMap[act.icon]}
      </div>
      <span class="text-xs font-semibold text-slate-700 text-center leading-snug group-hover:text-blue-600 transition-colors whitespace-pre-line">
        ${act.label}
      </span>
    </button>
  `).join('');
}

function animateCounters() {
  const totalEl = document.getElementById('dashboard-total-items');
  if (totalEl) animateValue(totalEl, 0, 152, 600);

  const kpi0 = document.getElementById('kpi-num-0');
  if (kpi0) animateValue(kpi0, 0, 152, 600);

  const kpi2 = document.getElementById('kpi-num-2');
  if (kpi2) animateValue(kpi2, 0, 8, 500);

  const kpi3 = document.getElementById('kpi-num-3');
  if (kpi3) animateValue(kpi3, 0, 6, 500);

  const kpi4 = document.getElementById('kpi-num-4');
  if (kpi4) animateValue(kpi4, 0, 3, 400);
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
    obj.textContent = Math.floor(easeProgress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.textContent = end;
    }
  };
  window.requestAnimationFrame(step);
}

function initNotifications(notifications) {
  const container = document.getElementById('notifications-list');
  if (!container) return;

  container.innerHTML = notifications.map(n => `
    <div class="p-3.5 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer" onclick="navigateTo('alerts')">
      <div class="text-xs font-bold text-slate-900">${n.title}</div>
      <div class="text-xs text-slate-500 mt-1">${n.desc}</div>
      <div class="text-[10px] text-slate-400 mt-1.5">${n.time}</div>
    </div>
  `).join('');
}

// ============================================================
// 4. INVENTORY MASTER MODULE (Fitts's Law & Accessibility)
// ============================================================
function renderInventoryView(items = window.supplyForgeData.inventory) {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;

  let filtered = items;
  if (currentInvCategory !== 'All') {
    filtered = filtered.filter(i => i.category === currentInvCategory);
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-slate-400">No inventory items found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    let statusClass = 'badge-in-stock';
    if (item.status === 'Low Stock') statusClass = 'badge-low-stock';
    if (item.status === 'Critical') statusClass = 'badge-critical';

    const isAlert = item.available <= item.minLevel;

    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 p-1 flex-shrink-0 flex items-center justify-center">
            <img src="${item.icon}" alt="${item.name}" class="w-full h-full object-contain" />
          </div>
          <span>${item.name}</span>
        </td>
        <td class="py-3.5 px-4 font-mono text-[11.5px] font-medium text-slate-600">${item.sku}</td>
        <td class="py-3.5 px-4 text-slate-700 font-medium">${item.category}</td>
        <td class="py-3.5 px-4 text-slate-600">${item.location}</td>
        <td class="py-3.5 px-4 text-right font-extrabold ${isAlert ? 'text-rose-600' : 'text-slate-900'}">${item.available} ${item.unit}</td>
        <td class="py-3.5 px-4 text-right text-slate-600 font-medium">${item.minLevel} ${item.unit}</td>
        <td class="py-3.5 px-4 text-right font-bold text-slate-900">₹ ${item.unitPrice}</td>
        <td class="py-3.5 px-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold ${statusClass}">
            <span>${item.statusIcon || '•'}</span> ${item.status}
          </span>
        </td>
        <td class="py-3.5 px-4 text-right space-x-2">
          <button onclick="quickReorder('${item.name}', '${item.sku}')" class="text-blue-600 hover:text-blue-700 font-bold text-xs px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors">Reorder</button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterInventoryCategory(cat) {
  currentInvCategory = cat;
  document.querySelectorAll('#inv-category-tabs .filter-tab').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(cat) || (cat === 'All' && btn.textContent.includes('All')));
  });
  renderInventoryView();
}

function filterInventorySearch(term) {
  const lower = term.toLowerCase().trim();
  const filtered = window.supplyForgeData.inventory.filter(i => 
    i.name.toLowerCase().includes(lower) ||
    i.sku.toLowerCase().includes(lower) ||
    i.location.toLowerCase().includes(lower)
  );
  renderInventoryView(filtered);
}

function exportInventoryCSV() {
  const items = window.supplyForgeData.inventory;
  let csv = 'SKU,Material Name,Category,Location,Available,Min Safety,Unit Rate,Status\n';
  items.forEach(i => {
    csv += `"${i.sku}","${i.name}","${i.category}","${i.location}",${i.available},${i.minLevel},${i.unitPrice},"${i.status}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SupplyForge_Inventory_V2_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  showToast('Inventory dataset exported as CSV', 'success');
}

function quickReorder(name, sku) {
  openModal('modal-create-po');
  const itemInput = document.getElementById('po-item');
  if (itemInput) itemInput.value = `${name} (${sku})`;
}

// ============================================================
// 5. SUPPLIERS MODULE
// ============================================================
function renderSuppliersView() {
  const container = document.getElementById('suppliers-grid-container');
  if (!container) return;

  container.innerHTML = window.supplyForgeData.suppliers.map(sup => `
    <div class="dashboard-card p-5 flex flex-col justify-between hover:border-slate-300 transition-all">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base flex-shrink-0" style="background-color: ${sup.initialBg}; color: ${sup.initialColor}">
              ${sup.initial}
            </div>
            <div>
              <h4 class="font-bold text-slate-900 text-sm leading-tight">${sup.name}</h4>
              <span class="text-[11px] text-slate-400 font-medium">${sup.category}</span>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center gap-1">
            ★ ${sup.rating}
          </span>
        </div>

        <div class="space-y-1.5 py-3 border-y border-slate-100 text-xs">
          <div class="flex justify-between text-slate-500">
            <span>Location:</span>
            <span class="font-medium text-slate-700">${sup.location}</span>
          </div>
          <div class="flex justify-between text-slate-500">
            <span>Contact:</span>
            <span class="font-medium text-slate-700">${sup.contactPerson} (${sup.phone})</span>
          </div>
          <div class="flex justify-between text-slate-500">
            <span>GSTIN:</span>
            <span class="font-mono text-slate-600">${sup.gstin}</span>
          </div>
          <div class="flex justify-between text-slate-500">
            <span>Payment Terms:</span>
            <span class="font-medium text-slate-700">${sup.paymentTerms}</span>
          </div>
        </div>
      </div>

      <div class="pt-4 flex items-center justify-between mt-2">
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-semibold">Total Procurement</div>
          <div class="text-sm font-bold text-slate-900">${sup.totalSpend}</div>
        </div>
        <button onclick="quickOrderFromSupplier('${sup.name}')" class="px-3.5 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-xs transition-colors btn-touch">
          Create PO
        </button>
      </div>
    </div>
  `).join('');
}

function quickOrderFromSupplier(vendorName) {
  openModal('modal-create-po');
  const vendorSelect = document.getElementById('po-vendor');
  if (vendorSelect) vendorSelect.value = vendorName;
}

// ============================================================
// 6. PURCHASE ORDERS MASTER MODULE
// ============================================================
function renderPurchaseOrdersView(orders = window.supplyForgeData.purchaseOrders) {
  const tbody = document.getElementById('po-table-body');
  if (!tbody) return;

  let filtered = orders;
  if (currentPOStatus !== 'All') {
    filtered = filtered.filter(po => po.status === currentPOStatus);
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-400">No purchase orders found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(po => {
    let badgeClass = 'badge-pending';
    if (po.status === 'Approved') badgeClass = 'badge-approved';
    if (po.status === 'Dispatched') badgeClass = 'badge-dispatched';
    if (po.status === 'Delivered') badgeClass = 'badge-delivered';

    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-3.5 px-4 font-bold text-blue-600 cursor-pointer hover:underline" onclick="openPOSlip('${po.id}')">${po.id}</td>
        <td class="py-3.5 px-4 font-semibold text-slate-900">${po.vendor}</td>
        <td class="py-3.5 px-4 text-slate-600">${po.itemsDesc}</td>
        <td class="py-3.5 px-4 text-slate-500">${po.date}</td>
        <td class="py-3.5 px-4 text-slate-500">${po.expectedDate}</td>
        <td class="py-3.5 px-4 text-right font-extrabold text-slate-900">${po.amount}</td>
        <td class="py-3.5 px-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold ${badgeClass}">
            <span>${po.statusIcon || '•'}</span> ${po.status}
          </span>
        </td>
        <td class="py-3.5 px-4 text-right space-x-2">
          <button onclick="openPOSlip('${po.id}')" class="text-slate-600 hover:text-blue-600 font-semibold text-xs px-2 py-1 rounded hover:bg-slate-100">View Slip</button>
          ${po.status === 'Pending' ? `<button onclick="approvePO('${po.id}')" class="text-emerald-600 hover:text-emerald-700 font-bold text-xs px-2 py-1 rounded hover:bg-emerald-50">Approve</button>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function filterPOStatus(status) {
  currentPOStatus = status;
  document.querySelectorAll('#po-status-tabs .filter-tab').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(status) || (status === 'All' && btn.textContent.includes('All')));
  });
  renderPurchaseOrdersView();
}

function approvePO(poId) {
  const po = window.supplyForgeData.purchaseOrders.find(p => p.id === poId);
  if (po) {
    po.status = 'Approved';
    po.statusIcon = '✓';
    renderPurchaseOrdersView();
    initPurchaseOrders(window.supplyForgeData.purchaseOrders);
    showToast(`Purchase Order ${poId} approved by ${window.supplyForgeData.currentUser ? window.supplyForgeData.currentUser.name : 'Authorized Signatory'}!`, 'success');
  }
}

function openPOSlip(poId) {
  const po = window.supplyForgeData.purchaseOrders.find(p => p.id === poId);
  if (!po) return;

  const numEl = document.getElementById('slip-po-number');
  if (numEl) numEl.textContent = po.id;

  const content = document.getElementById('slip-content');
  if (!content) return;

  const signatory = window.supplyForgeData.currentUser ? window.supplyForgeData.currentUser.name : 'Parv Vashistha';
  const signatoryRole = window.supplyForgeData.currentUser ? window.supplyForgeData.currentUser.role : 'Inventory Manager';

  content.innerHTML = `
    <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
      <div>
        <div class="text-[10px] text-slate-400 uppercase font-semibold">Vendor / Supplier</div>
        <div class="font-bold text-slate-900 text-sm">${po.vendor}</div>
      </div>
      <div class="text-right">
        <div class="text-[10px] text-slate-400 uppercase font-semibold">Order Status</div>
        <span class="inline-flex items-center gap-1 font-bold text-xs text-blue-600">${po.statusIcon || '•'} ${po.status}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 text-slate-600">
      <div><strong>Issue Date:</strong> ${po.date}</div>
      <div><strong>Expected Due:</strong> ${po.expectedDate}</div>
    </div>

    <div class="border border-slate-100 rounded-xl overflow-hidden mt-3">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-100/70 text-slate-600 font-semibold">
          <tr>
            <th class="p-2.5">Item Description</th>
            <th class="p-2.5 text-right">Qty</th>
            <th class="p-2.5 text-right">Rate</th>
            <th class="p-2.5 text-right">Total</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${(po.lineItems || [{ name: po.itemsDesc, qty: 'Standard', rate: '-', total: po.amount }]).map(li => `
            <tr>
              <td class="p-2.5 font-medium">${li.name}</td>
              <td class="p-2.5 text-right text-slate-500">${li.qty}</td>
              <td class="p-2.5 text-right text-slate-500">${li.rate}</td>
              <td class="p-2.5 text-right font-bold text-slate-800">${li.total}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center pt-2 text-xs">
      <span class="text-slate-500">Authorized Signatory: <strong>${signatory} (${signatoryRole})</strong></span>
      <span class="text-sm font-extrabold text-slate-900">Total: ${po.amount}</span>
    </div>
  `;

  openModal('modal-view-po-slip');
}

// ============================================================
// 7. GOODS RECEIPT (GRN) MODULE
// ============================================================
function renderGoodsReceiptView() {
  const tbody = document.getElementById('grn-table-body');
  if (!tbody) return;

  tbody.innerHTML = window.supplyForgeData.goodsReceipts.map(grn => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="py-3.5 px-4 font-bold text-teal-700">${grn.grnNumber}</td>
      <td class="py-3.5 px-4 font-semibold text-blue-600 cursor-pointer hover:underline" onclick="openPOSlip('${grn.poNumber}')">${grn.poNumber}</td>
      <td class="py-3.5 px-4 text-slate-800">${grn.vendor}</td>
      <td class="py-3.5 px-4 text-slate-600">${grn.itemsReceived}</td>
      <td class="py-3.5 px-4 text-slate-500">${grn.receivingBay}</td>
      <td class="py-3.5 px-4 text-slate-500">${grn.receivedDate}</td>
      <td class="py-3.5 px-4 text-center">
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold ${grn.qcStatus === 'Passed' ? 'badge-approved' : 'badge-low-stock'}">
          <span>${grn.qcStatus === 'Passed' ? '✓' : '⚠️'}</span> ${grn.qcStatus}
        </span>
      </td>
      <td class="py-3.5 px-4 text-slate-600">${grn.inspector}</td>
      <td class="py-3.5 px-4 text-right">
        <button onclick="showToast('Downloading ${grn.grnNumber} Receipt Slip PDF...', 'success')" class="text-teal-600 hover:text-teal-700 font-bold text-xs px-2 py-1 rounded hover:bg-teal-50">PDF Slip</button>
      </td>
    </tr>
  `).join('');
}

// ============================================================
// 8. STOCK MOVEMENTS MODULE
// ============================================================
function renderStockMovementsView() {
  const tbody = document.getElementById('movements-table-body');
  if (!tbody) return;

  tbody.innerHTML = window.supplyForgeData.stockMovements.map(sm => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="py-3.5 px-4 font-mono font-bold text-purple-700">${sm.transferId}</td>
      <td class="py-3.5 px-4 font-semibold text-slate-900">${sm.material}</td>
      <td class="py-3.5 px-4 text-right font-bold text-slate-800">${sm.quantity}</td>
      <td class="py-3.5 px-4 text-slate-500">${sm.fromLocation}</td>
      <td class="py-3.5 px-4 font-medium text-slate-700">${sm.toLocation}</td>
      <td class="py-3.5 px-4 text-slate-400 text-[11px]">${sm.timestamp}</td>
      <td class="py-3.5 px-4 text-slate-600">${sm.requestedBy}</td>
      <td class="py-3.5 px-4 text-center">
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold badge-approved">
          <span>✓</span> ${sm.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// ============================================================
// 9. REPORTS & ANALYTICS MODULE
// ============================================================
function renderReportsView() {
  const chartContainer = document.getElementById('reports-spend-chart');
  if (!chartContainer) return;

  const trend = window.supplyForgeData.reports.monthlyTrend;
  const maxSpend = 3.0; // max ₹ 3.0 Cr scale

  chartContainer.innerHTML = trend.map((item, index) => {
    const heightPercent = (item.spend / maxSpend) * 100;
    const isCurrent = index === trend.length - 1;
    // Follow the scheme: #B0E0E6 for prior months, #32de84 for current peak month, with hover highlight
    const barStyle = isCurrent 
      ? 'background-color: #32de84; box-shadow: 0 4px 14px rgba(50, 222, 132, 0.45);' 
      : 'background-color: #B0E0E6;';

    return `
      <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
        <span class="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1">₹ ${item.spend} Cr</span>
        <div 
          class="w-full max-w-[42px] rounded-t-xl transition-all duration-300 group-hover:scale-y-105 origin-bottom group-hover:brightness-95" 
          style="height: ${heightPercent}%; ${barStyle}"
        ></div>
        <span class="text-xs font-semibold ${isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'} mt-1">${item.month}</span>
      </div>
    `;
  }).join('');
}

// ============================================================
// 10. ALERTS & THRESHOLD MODULE (Von Restorff Effect)
// ============================================================
function renderAlertsView() {
  const container = document.getElementById('alerts-master-list');
  if (!container) return;

  const lowItems = window.supplyForgeData.inventory.filter(i => i.available <= i.minLevel);

  container.innerHTML = lowItems.map(item => {
    const isCritical = item.status === 'Critical' || item.available <= 15;
    return `
      <div class="p-4 rounded-xl border ${isCritical ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200/80 bg-white'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 p-2 flex-shrink-0 flex items-center justify-center ${isCritical ? 'pulse-alert' : ''}">
            <img src="${item.icon}" alt="${item.name}" class="w-full h-full object-contain" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-slate-900 text-sm">${item.name}</h4>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${isCritical ? 'badge-critical' : 'badge-low-stock'}">
                <span>${isCritical ? '⚠️' : '⚡'}</span> ${item.status}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Location: ${item.location} • Safe Threshold: ${item.minLevel} ${item.unit}</p>
          </div>
        </div>

        <div class="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
          <div class="text-right">
            <div class="text-[10px] text-slate-400 font-semibold uppercase">Remaining Stock</div>
            <div class="text-base font-extrabold text-rose-600">${item.available} ${item.unit}</div>
          </div>
          <button onclick="quickReorder('${item.name}', '${item.sku}')" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm hover:shadow btn-touch">
            1-Click Reorder
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// 11. FORMS & MODALS MANAGEMENT
// ============================================================
function setupForms() {
  // PO Form
  const poForm = document.getElementById('form-create-po');
  if (poForm) {
    poForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const vendor = document.getElementById('po-vendor').value;
      const itemDesc = document.getElementById('po-item').value;
      const qty = document.getElementById('po-qty').value;
      const amount = document.getElementById('po-amount').value || '₹ 45,000';
      const date = document.getElementById('po-delivery-date').value || '2025-06-28';

      const newId = `PO-2025-${Math.floor(126 + Math.random() * 50)}`;
      const newPO = {
        id: newId,
        vendor: vendor,
        itemsDesc: `${itemDesc} (${qty})`,
        amount: amount,
        status: "Pending",
        statusIcon: "⏳",
        date: "Today",
        expectedDate: date,
        initial: vendor.charAt(0).toUpperCase(),
        initialBg: "#EFF6FF",
        initialColor: "#2563EB",
        lineItems: [{ name: itemDesc, qty: qty, rate: '-', total: amount }]
      };

      window.supplyForgeData.purchaseOrders.unshift(newPO);
      renderPurchaseOrdersView();
      initPurchaseOrders(window.supplyForgeData.purchaseOrders);
      closeModal('modal-create-po');
      poForm.reset();
      showToast(`Purchase Order ${newId} created successfully!`, 'success');
    });
  }

  // Material Form
  const matForm = document.getElementById('form-add-material');
  if (matForm) {
    matForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mat-name').value;
      const category = document.getElementById('mat-category').value;
      const location = document.getElementById('mat-location').value;
      const qty = parseInt(document.getElementById('mat-qty').value) || 0;
      const min = parseInt(document.getElementById('mat-min').value) || 0;
      const unit = document.getElementById('mat-unit').value || 'Kg';
      const price = parseInt(document.getElementById('mat-price').value) || 100;

      const newSKU = `RAW-${name.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      const newMat = {
        sku: newSKU,
        name: name,
        category: category,
        location: location,
        available: qty,
        minLevel: min,
        unit: unit,
        unitPrice: price,
        status: qty <= min ? "Low Stock" : "In Stock",
        statusIcon: qty <= min ? "⚡" : "✓",
        icon: "assets/illustrations/ms-steel-sheets.svg",
        lastRestocked: "Today"
      };

      window.supplyForgeData.inventory.unshift(newMat);
      window.supplyForgeData.inventorySnapshot.totalItems += 1;
      const catObj = window.supplyForgeData.inventorySnapshot.categories.find(c => c.name === category);
      if (catObj) catObj.count += 1;

      renderInventoryView();
      initInventorySnapshot(window.supplyForgeData.inventorySnapshot);
      closeModal('modal-add-material');
      matForm.reset();
      showToast(`Material "${name}" added to inventory catalog!`, 'success');
    });
  }

  // Stock Movement Form
  const smForm = document.getElementById('form-stock-movement');
  if (smForm) {
    smForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const origin = document.getElementById('sm-origin').value;
      const dest = document.getElementById('sm-dest').value;
      const mat = document.getElementById('sm-material').value;
      const qty = document.getElementById('sm-qty').value;

      const currentUserName = window.supplyForgeData.currentUser ? window.supplyForgeData.currentUser.name : 'Parv Vashistha';

      const newSM = {
        transferId: `TR-2025-${Math.floor(100 + Math.random() * 900)}`,
        material: mat,
        quantity: qty,
        fromLocation: origin,
        toLocation: dest,
        timestamp: "Just Now",
        requestedBy: `${currentUserName} (${window.supplyForgeData.currentUser ? window.supplyForgeData.currentUser.role : 'Inventory Mgr'})`,
        status: "Completed"
      };

      window.supplyForgeData.stockMovements.unshift(newSM);
      renderStockMovementsView();
      closeModal('modal-stock-movement');
      smForm.reset();
      showToast(`Stock transfer ${newSM.transferId} recorded successfully!`, 'success');
    });
  }

  // GRN Form
  const grnForm = document.getElementById('form-goods-receipt');
  if (grnForm) {
    grnForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const poNum = document.getElementById('grn-po').value;
      const items = document.getElementById('grn-items').value;
      const bay = document.getElementById('grn-bay').value;
      const qc = document.getElementById('grn-qc').value;

      const inspectorName = window.supplyForgeData.currentUser ? window.supplyForgeData.currentUser.name : 'Arun Akash';

      const newGRN = {
        grnNumber: `GRN-2025-${Math.floor(420 + Math.random() * 50)}`,
        poNumber: poNum,
        vendor: "Verified Supplier",
        itemsReceived: items,
        receivingBay: bay,
        receivedDate: "Today",
        qcStatus: qc,
        inspector: inspectorName,
        invoiceRef: `INV-2025-${Math.floor(1000 + Math.random() * 9000)}`
      };

      window.supplyForgeData.goodsReceipts.unshift(newGRN);
      renderGoodsReceiptView();
      closeModal('modal-goods-receipt');
      grnForm.reset();
      showToast(`GRN ${newGRN.grnNumber} generated successfully!`, 'success');
    });
  }

  // Supplier Form
  const supForm = document.getElementById('form-add-supplier');
  if (supForm) {
    supForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sup-name').value;
      const cat = document.getElementById('sup-category').value;
      const loc = document.getElementById('sup-location').value;
      const contact = document.getElementById('sup-contact').value;
      const email = document.getElementById('sup-email').value;

      const newSup = {
        id: `SUP-${Math.floor(10 + Math.random() * 90)}`,
        name: name,
        initial: name.charAt(0).toUpperCase(),
        initialBg: "#EFF6FF",
        initialColor: "#2563EB",
        category: cat,
        rating: 5.0,
        location: loc,
        contactPerson: contact,
        phone: "+91 98000 11223",
        email: email,
        gstin: "27AABCT9999P1Z1",
        paymentTerms: "Net 30 Days",
        activeOrders: 0,
        totalSpend: "₹ 0.00",
        status: "Active & Certified"
      };

      window.supplyForgeData.suppliers.unshift(newSup);
      renderSuppliersView();
      closeModal('modal-add-supplier');
      supForm.reset();
      showToast(`Supplier "${name}" registered successfully!`, 'success');
    });
  }
}

// ============================================================
// 12. GLOBAL SHORTCUTS & INTERACTION HANDLERS (Jakob's Law)
// ============================================================
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Focus search on '/' keypress if not already in an input
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const search = document.getElementById('global-search');
      if (search) {
        search.focus();
        search.select();
      }
    }

    // Dismiss modals on 'Escape'
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal.id);
      });
      document.getElementById('notif-dropdown')?.classList.add('hidden');
      document.getElementById('user-dropdown')?.classList.add('hidden');
      document.getElementById('date-dropdown')?.classList.add('hidden');
    }
  });
}

function setupSearch(data) {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    const activeSection = document.querySelector('.page-view:not(.hidden)');
    if (activeSection && activeSection.id === 'view-inventory') {
      filterInventorySearch(term);
      return;
    }

    const filteredPOs = data.purchaseOrders.filter(po => 
      po.id.toLowerCase().includes(term) ||
      po.vendor.toLowerCase().includes(term) ||
      po.status.toLowerCase().includes(term)
    );
    initPurchaseOrders(filteredPOs);

    const filteredAlerts = data.lowStockAlerts.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.unit.toLowerCase().includes(term)
    );
    initLowStockAlerts(filteredAlerts);
  });
}

function setupDropdowns() {
  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('hidden');
      document.getElementById('user-dropdown')?.classList.add('hidden');
      document.getElementById('date-dropdown')?.classList.add('hidden');
    });
  }

  const userBtn = document.getElementById('user-menu-btn');
  const userDropdown = document.getElementById('user-dropdown');
  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
      document.getElementById('notif-dropdown')?.classList.add('hidden');
      document.getElementById('date-dropdown')?.classList.add('hidden');
    });
  }

  const dateBtn = document.getElementById('date-selector-btn');
  const dateDropdown = document.getElementById('date-dropdown');
  if (dateBtn && dateDropdown) {
    dateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dateDropdown.classList.toggle('hidden');
      document.getElementById('notif-dropdown')?.classList.add('hidden');
      document.getElementById('user-dropdown')?.classList.add('hidden');
    });
  }

  document.addEventListener('click', () => {
    notifDropdown?.classList.add('hidden');
    userDropdown?.classList.add('hidden');
    dateDropdown?.classList.add('hidden');
  });

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
    });
  }
}

function setupModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function selectDate(dateString) {
  const label = document.getElementById('selected-date-text');
  if (label) label.textContent = dateString;
  showToast(`Date filter applied: ${dateString}`);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = '🔔';
  if (type === 'success') icon = '✅';
  if (type === 'alert') icon = '⚠️';

  toast.innerHTML = `
    <span class="text-base flex-shrink-0">${icon}</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-leave');
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Global Window Exports
window.navigateTo = navigateTo;
window.handleLoginSubmit = handleLoginSubmit;
window.selectDemoUser = selectDemoUser;
window.loginAs = loginAs;
window.logout = logout;
window.switchUser = switchUser;
window.togglePasswordVisibility = togglePasswordVisibility;
window.filterInventoryCategory = filterInventoryCategory;
window.filterInventorySearch = filterInventorySearch;
window.exportInventoryCSV = exportInventoryCSV;
window.quickReorder = quickReorder;
window.quickOrderFromSupplier = quickOrderFromSupplier;
window.filterPOStatus = filterPOStatus;
window.approvePO = approvePO;
window.openPOSlip = openPOSlip;
window.openModal = openModal;
window.closeModal = closeModal;
window.selectDate = selectDate;
window.showToast = showToast;
