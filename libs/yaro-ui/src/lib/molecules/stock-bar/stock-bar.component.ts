import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';

type StockLevel = 'ok' | 'low' | 'critical';

@Component({
  selector: 'yaro-stock-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './stock-bar.component.scss',
  template: `
    <div class="stock-bar" [class]="hostClass()">
      <div class="stock-bar-header">
        <span class="stock-bar-label">{{ label }}</span>
        <span class="stock-bar-count">
          <span class="stock-bar-current">{{ current }}</span>
          <span class="stock-bar-sep">/</span>
          <span class="stock-bar-max">{{ max }}</span>
        </span>
      </div>
      <div class="stock-bar-track"
           role="meter"
           [attr.aria-valuenow]="current"
           [attr.aria-valuemin]="0"
           [attr.aria-valuemax]="max"
           [attr.aria-label]="label">
        <div class="stock-bar-fill" [style.width.%]="percentage()"></div>
      </div>
    </div>
  `,
})
export class YaroStockBarComponent {
  @Input() label = '';
  @Input() set current(v: number) { this._current.set(v); }
  @Input() max               = 100;
  @Input() lowThreshold      = 30;
  @Input() criticalThreshold = 10;

  private _current = signal(0);

  protected percentage = computed(() =>
    Math.min(100, Math.max(0, (this._current() / this.max) * 100))
  );

  protected level = computed((): StockLevel => {
    const pct = this.percentage();
    if (pct <= this.criticalThreshold) return 'critical';
    if (pct <= this.lowThreshold)      return 'low';
    return 'ok';
  });

  protected hostClass = computed(() => `stock-bar--${this.level()}`);

  get current(): number { return this._current(); }
}
