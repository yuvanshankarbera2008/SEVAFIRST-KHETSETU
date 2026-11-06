/* ==========================================================================
   KhetSetu (खेत सेतु) — Motion System & Interactive Transitions (Section 2)
   Smooth, calm, 60fps on mobile. IntersectionObserver reveals, stats count-up, toasts.
   ========================================================================== */

export function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

export function initCountUps() {
  const countElements = document.querySelectorAll('[data-count-to]');
  if (!countElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count-to'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1600; // ms
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutQuad
          const easeProgress = 1 - (1 - progress) * (1 - progress);
          const currentVal = Math.floor(easeProgress * target);

          el.textContent = `${prefix}${currentVal.toLocaleString('en-IN')}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  countElements.forEach(el => observer.observe(el));
}

export function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const typeClass = type === 'error' ? 'toast-terracotta' : type === 'warning' ? 'toast-marigold' : '';
  toast.className = `toast ${typeClass}`;
  
  const icon = type === 'error' ? '⚠️' : type === 'warning' ? '⚡' : '✅';
  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${icon}</span>
    <span style="flex: 1; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

