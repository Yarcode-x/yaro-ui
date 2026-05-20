import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';

@Component({
  selector: 'yaro-delta',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './delta.component.scss',
  template: `
    <span [class]="classes()" [attr.aria-label]="ariaLabel()">
      <span class="delta-arrow" aria-hidden="true">{{ arrow() }}</span>
      <span class="delta-value">{{ displayValue() }}</span>
    </span>
  `,
})
export class YaroDeltaComponent {
  @Input() set value(v: number) { this._value.set(v); }
  @Input() unit     = '%';
  @Input() decimals = 1;
  // inverted: true cuando un valor negativo es positivo (ej. reducción de costos)
  @Input() inverted = false;

  private _value = signal(0);

  protected arrow = computed(() => (this._value() >= 0 ? '↑' : '↓'));

  protected displayValue = computed(() => {
    const abs = Math.abs(this._value());
    return `${abs.toFixed(this.decimals)}${this.unit}`;
  });

  protected classes = computed(() => {
    const positive = this.inverted ? this._value() <= 0 : this._value() >= 0;
    return `delta delta--${positive ? 'positive' : 'negative'}`;
  });

  protected ariaLabel = computed(() => {
    const dir = this._value() >= 0 ? 'subió' : 'bajó';
    return `${dir} ${this.displayValue()}`;
  });
}
