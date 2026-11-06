/* ==========================================================================
   KhetSetu (खेत सेतु) — Live Location Panel & Animated Route Map (Section 15)
   Visual canvas / SVG simulation with interpolated vehicle motion & stops
   ========================================================================== */

export function renderLiveMap(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const role = options.role || 'farmer'; // 'farmer' | 'buyer' | 'pickup' | 'coordinator'
  
  // Stops configuration in Warangal cluster
  const stops = [
    { name: 'Ravi’s Farm (Geesugonda)', x: 90, y: 190, status: 'done', label: 'Collected' },
    { name: 'Lakshmi’s Farm (Geesugonda)', x: 190, y: 130, status: 'current', label: 'Collecting Now' },
    { name: 'Suresh’s Farm (Nekkonda)', x: 330, y: 170, status: 'next', label: 'Next Stop (ETA 12m)' },
    { name: 'Central Aggregation Hub (Hanamkonda)', x: 480, y: 90, status: 'pending', label: 'Hub Dispatch' },
    { name: 'FreshKart Retail Center (Warangal)', x: 580, y: 140, status: 'pending', label: 'Final Delivery' }
  ];

  container.innerHTML = `
    <div class="live-map-card">
      <div class="live-map-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="pulse-dot"></span>
          <span style="font-weight: 700; font-size: 0.95rem; color: var(--ks-green-950);">LIVE ROUTE TRACKING</span>
          <span class="badge badge-live">TS-03-AG-8821</span>
        </div>
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--ks-text-secondary);">
          Driver: <strong style="color: var(--ks-green-900);">K. Naresh</strong> · Speed: 34 km/h
        </div>
      </div>

      <div class="live-map-canvas-container" id="mapCanvasWrap_${containerId}">
        <svg id="svgMap_${containerId}" viewBox="0 0 680 280" style="width: 100%; height: 100%; display: block;">
          <!-- Map Background Stylings -->
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#27AE60" />
              <stop offset="45%" stop-color="#E58E26" />
              <stop offset="100%" stop-color="#708076" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow"/>
              <feComposite in="SourceGraphic" in2="glow" operator="over"/>
            </filter>
          </defs>

          <!-- Rural road network grid -->
          <path d="M 30,240 Q 200,210 350,250 T 650,230" fill="none" stroke="#d5e2d0" stroke-width="6" stroke-linecap="round" />
          <path d="M 120,40 Q 220,100 280,40 T 520,60" fill="none" stroke="#d5e2d0" stroke-width="4" stroke-linecap="round" />
          
          <!-- Active pooled pickup route path -->
          <path id="routeLine_${containerId}"
            d="M 90,190 L 190,130 L 330,170 L 480,90 L 580,140"
            fill="none"
            stroke="url(#routeGrad)"
            stroke-width="5"
            stroke-linecap="round"
            stroke-dasharray="8 6"
            style="animation: dash-move 30s linear infinite;"
          />

          <!-- Farm Stops -->
          ${stops.map((stop, i) => `
            <g transform="translate(${stop.x}, ${stop.y})">
              <!-- Ping circle for current stop -->
              ${stop.status === 'current' ? `
                <circle r="16" fill="rgba(229, 142, 38, 0.25)" class="pulse-marker" />
                <circle r="24" fill="rgba(229, 142, 38, 0.12)" />
              ` : ''}
              
              <circle r="9" fill="${stop.status === 'done' ? '#27AE60' : stop.status === 'current' ? '#E58E26' : '#FFFFFF'}"
                      stroke="${stop.status === 'done' ? '#1E8449' : stop.status === 'current' ? '#D35400' : '#A6ACAF'}"
                      stroke-width="3" />
              
              <text y="-14" text-anchor="middle" font-size="11" font-weight="700" fill="#143522"
                    style="text-shadow: 0 1px 3px rgba(255,255,255,0.9);">
                ${stop.name}
              </text>
              <text y="24" text-anchor="middle" font-size="10" font-weight="600" fill="#56635A">
                ${stop.label}
              </text>
            </g>
          `).join('')}

          <!-- Moving Vehicle Icon -->
          <g id="vehicleIcon_${containerId}" transform="translate(190, 130)" style="transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);">
            <circle r="14" fill="#143522" filter="url(#glow)" />
            <!-- Vehicle Mini SVG Icon -->
            <path d="M -7,-4 L -4,-7 L 4,-7 L 7,-4 L 7,4 L -7,4 Z" fill="#FFFFFF" />
            <circle cx="-4" cy="5" r="2" fill="#E58E26" />
            <circle cx="4" cy="5" r="2" fill="#E58E26" />
          </g>
        </svg>
      </div>

      <!-- Live Timeline Strip (Section 15) -->
      <div style="padding: 18px 24px; background: #FFFFFF; border-top: 1px solid var(--ks-cream-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-size: 0.85rem; color: var(--ks-text-secondary);">Current Status:</span>
            <strong style="color: var(--ks-green-800); margin-left: 6px; font-size: 0.95rem;">
              ${role === 'buyer' ? 'En Route to Delivery Hub (Warangal)' : 'Shared Pickup in Progress — Stop 2 of 4'}
            </strong>
          </div>
          <div style="background: var(--ks-marigold-light); color: var(--ks-saffron); font-weight: 700; padding: 4px 12px; border-radius: var(--ks-radius-full); font-size: 0.85rem;">
            ETA: 12 Minutes to Suresh’s Farm
          </div>
        </div>

        <!-- 4-step Horizontal Progress Timeline -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--ks-green-700); color: #fff; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; font-weight: 700;">✓</div>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--ks-green-900);">Scheduled</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--ks-marigold); color: #fff; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; font-weight: 700;">●</div>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--ks-marigold);">Vehicle en-route</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--ks-cream-border); color: var(--ks-text-tertiary); font-size: 0.75rem; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</div>
            <span style="font-size: 0.75rem; color: var(--ks-text-secondary);">Quality Checked</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--ks-cream-border); color: var(--ks-text-tertiary); font-size: 0.75rem; display: flex; align-items: center; justify-content: center; font-weight: 700;">4</div>
            <span style="font-size: 0.75rem; color: var(--ks-text-secondary);">Delivered & Paid</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Start smooth interpolated movement of the vehicle along the stops
  startVehicleAnimation(`vehicleIcon_${containerId}`, stops);
}

function startVehicleAnimation(elementId, stops) {
  let stepIndex = 1;
  const interval = setInterval(() => {
    const el = document.getElementById(elementId);
    if (!el) {
      clearInterval(interval);
      return;
    }
    
    // Interpolate between stops
    const targetStop = stops[stepIndex];
    if (targetStop) {
      el.setAttribute('transform', `translate(${targetStop.x}, ${targetStop.y})`);
    }

    stepIndex = (stepIndex + 1) % stops.length;
  }, 4000);
}

