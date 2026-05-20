import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize    = 'sm' | 'md' | 'lg';

@Component({
  selector: 'yaro-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './button.component.scss',
  template: `
    <button
      [class]="classes"
      [type]="type"
      [disabled]="disabled || loading"
      [attr.aria-busy]="loading || null">
      @if (loading) {
        <span class="btn-spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
})
export class YaroButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading  = false;

  get classes(): string {
    return `btn btn--${this.variant} btn--${this.size}`;
  }
}
