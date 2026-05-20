// @yaro/ui — barrel export
// Los consumidores importan desde '@yaro/ui', nunca desde rutas internas.

// ─── Paso 3 — Átomos ──────────────────────────────────────────────────────────
export * from './lib/atoms/button/button.component';
export * from './lib/atoms/badge/badge.component';
export * from './lib/atoms/input/input.component';
export * from './lib/atoms/toggle/toggle.component';
export * from './lib/atoms/avatar/avatar.component';
export * from './lib/atoms/delta/delta.component';

// ─── Paso 4 — Moléculas ───────────────────────────────────────────────────────
export * from './lib/molecules/card/card.component';
export * from './lib/molecules/kpi/kpi.component';
export * from './lib/molecules/stat-bar/stat-bar.component';
export * from './lib/molecules/stock-bar/stock-bar.component';
export * from './lib/molecules/nav-item/nav-item.component';
export * from './lib/molecules/form-row/form-row.component';
export * from './lib/molecules/info-box/info-box.component';

// ─── Paso 5 — Organismos ──────────────────────────────────────────────────────
export * from './lib/organisms/modal/modal.component';
export * from './lib/organisms/data-table/data-table.component';
export * from './lib/organisms/sidenav/sidenav.component';
export * from './lib/organisms/topbar/topbar.component';
export * from './lib/organisms/bienestar-picker/bienestar-picker.component';
export * from './lib/organisms/connection-badge/connection-badge.component';
