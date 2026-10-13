/**
 * Donut Chart Component for Inventory Snapshot
 * Styled according to the calibrated brand scheme:
 * - #32de84 (Total Stock Green)
 * - #0284C7 (Electric Accent Blue)
 * - #B0E0E6 (Selected Powder Blue)
 * - #FF5F1F (Low Stock Neon Orange)
 * Uses exact SVG mathematical arc paths - 100% immune to CSS transform-origin bugs or browser drift.
 */

function renderInventoryChart(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const size = 120;
  const strokeWidth = 19;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 44; // Outer diameter = 88 + 19 = 107px, inner hole = 88 - 19 = 69px (clean white center)

  const categories = data.categories;
  const total = categories.reduce((sum, item) => sum + item.percentage, 0);

  let currentAngle = 0; // Starts at 12 o'clock
  let pathsHtml = '';

  categories.forEach((cat) => {
    const sliceAngle = (cat.percentage / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    // Convert angles to Cartesian coordinates (12 o'clock = -90 deg)
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;

    const x1 = (cx + radius * Math.cos(startRad)).toFixed(2);
    const y1 = (cy + radius * Math.sin(startRad)).toFixed(2);
    const x2 = (cx + radius * Math.cos(endRad)).toFixed(2);
    const y2 = (cy + radius * Math.sin(endRad)).toFixed(2);

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;
    const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

    pathsHtml += `
      <path
        d="${pathData}"
        stroke="${cat.color}"
        stroke-width="${strokeWidth}"
        fill="none"
        stroke-linecap="butt"
        class="donut-segment cursor-pointer"
        data-name="${cat.name}"
        data-count="${cat.count}"
        data-percentage="${cat.percentage}%"
        data-color="${cat.color}"
      />
    `;

    currentAngle = endAngle;
  });

  container.innerHTML = `
    <div class="relative flex items-center justify-center group">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="overflow-visible block donut-chart-svg">
        ${pathsHtml}
      </svg>
      <!-- Interactive Tooltip Box with Matching Color Accent -->
      <div id="chart-tooltip" class="absolute pointer-events-none bg-slate-900/95 text-white text-[11px] py-1.5 px-3 rounded-xl shadow-xl opacity-0 transition-opacity duration-150 z-30 whitespace-nowrap border border-slate-700/60 backdrop-blur-sm">
      </div>
    </div>
  `;

  // Attach interactive hover tooltips with color dot & glow bloom
  const segments = container.querySelectorAll('.donut-segment');
  const tooltip = container.querySelector('#chart-tooltip');

  segments.forEach(segment => {
    segment.addEventListener('mouseenter', () => {
      const name = segment.getAttribute('data-name');
      const count = segment.getAttribute('data-count');
      const pct = segment.getAttribute('data-percentage');
      const color = segment.getAttribute('data-color');

      tooltip.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style="background-color: ${color}; box-shadow: 0 0 6px ${color}"></span><strong>${name}</strong>: ${count} (${pct})`;
      tooltip.style.opacity = '1';
      segment.style.strokeWidth = '23px';
      segment.style.filter = `drop-shadow(0 0 8px ${color}99)`;
    });

    segment.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - rect.left + 10}px`;
      tooltip.style.top = `${e.clientY - rect.top - 32}px`;
    });

    segment.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      segment.style.strokeWidth = `${strokeWidth}px`;
      segment.style.filter = 'none';
    });
  });
}

window.renderInventoryChart = renderInventoryChart;
