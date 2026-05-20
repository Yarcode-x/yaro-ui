import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type BadgeIntent = 'accent' | 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'neutral';
export type BadgeSize   = 'sm' | 'md';

@Component({
  selector: 'yaro-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './badge.component.scss',
  template: `
    <span [class]="classes">
      @if (dot) { <span class="badge-dot" aria-hidden="true"></span> }
      <ng-content />
    </span>
  `,
})
export class YaroBadgeComponent {
  @Input() intent: BadgeIntent = 'neutral';
  @Input() size: BadgeSize = 'md';
  @Input() dot = false;

  get classes(): string {
    return `badge badge--${this.intent} badge--${this.size}`;
  }
}
