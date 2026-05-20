/* ─── YARO UI · main.js ──────────────────────────────────────────────────────
   Funciones compartidas: copy token, copy code, scroll spy, tab switching.
   ─────────────────────────────────────────────────────────────────────────── */

/* ─── Toast ──────────────────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/* ─── Copiar token CSS ───────────────────────────────────────────────────── */
function copyToken(text) {
  navigator.clipboard.writeText(text).catch(() => {});
  showToast('📋 Copiado: ' + text);
}

/* ─── Copiar bloque de código ────────────────────────────────────────────── */
function copyCode(btn) {
  const pre = btn.nextElementSibling;
  navigator.clipboard.writeText(pre.innerText).catch(() => {});
  btn.textContent = '✓ Copiado';
  setTimeout(() => btn.textContent = 'Copiar', 2000);
}

/* ─── Scroll a sección (desde sidenav) ──────────────────────────────────── */
function scrollToSection(id, el) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.sn-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
}

/* ─── Scroll spy ─────────────────────────────────────────────────────────── */
function initScrollSpy() {
  const navItems = document.querySelectorAll('.sn-item[data-id]');
  if (!navItems.length) return;

  const ids = Array.from(navItems).map(n => n.dataset.id);

  window.addEventListener('scroll', () => {
    let current = ids[0];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 100) current = id;
    });
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.id === current);
    });
  }, { passive: true });
}

/* ─── Tab switching (demo / código) ─────────────────────────────────────── */
function switchTab(tabEl, panelId) {
  const card = tabEl.closest('.comp-card');
  card.querySelectorAll('.comp-tab').forEach(t => t.classList.remove('active'));
  card.querySelectorAll('.comp-panel').forEach(p => p.classList.add('hidden'));
  tabEl.classList.add('active');
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.remove('hidden');
}

/* ─── Init ───────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', initScrollSpy);
