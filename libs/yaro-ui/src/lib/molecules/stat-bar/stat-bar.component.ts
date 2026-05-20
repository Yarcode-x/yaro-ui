import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';

export type StatBarIntent = 'accent' | 'green' | 'amber' | 'red' | 'blue' | 'purple';

@Component({
  selector: 'yaro-stat-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './stat-bar.component.scss',
  template: `
    <div class="stat-bar">
      <div class="stat-bar-header">
        <span class="stat-bar-label">{{ label }}</span>
        <span class="stat-bar-value">{{ displayValue() }}</span>
      </div>
      <div class="stat-bar-track" role="progressbar"
           [attr.aria-valuenow]="value"
           [attr.aria-valuemin]="0"
           [attr.aria-valuemax]="max"
           [attr.aria-label]="label">
        <div class="stat-bar-fill"
             [class]="fillClass()"
             [style.width.%]="percentage()">
        </div>
      </div>
    </div>
  `,
})
export class YaroStatBarComponent {
  @Input() label:      string        = '';
  @Input() set value(v: number)      { this._value.set(v); }
  @Input() max:        number        = 100;
  @Input() intent:     StatBarIntent = 'accent';
  @Input() showPercent = true;

  private _value = signal(0);

  protected percentage  = computed(() => Math.min(100, Math.max(0, (this._value() / this.max) * 100)));
  protected displayValue = computed(() =>
    this.showPercent
      ? `${this.percentage().toFixed(0)}%`
      : `${this._value()} / ${this.max}`
  );
  protected fillClass = computed(() => `stat-bar-fill--${this.intent}`);
}
