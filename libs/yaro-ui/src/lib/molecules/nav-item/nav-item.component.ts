import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { YaroBadgeComponent, BadgeIntent } from '../../atoms/badge/badge.component';

@Component({
  selector: 'yaro-nav-item',
  standalone: true,
  imports: [YaroBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './nav-item.component.scss',
  template: `
    <button
      class="nav-item"
      [class.nav-item--active]="active"
      type="button"
      [attr.aria-current]="active ? 'page' : null"
      (click)="itemClick.emit()">
      @if (icon) {
        <span class="nav-item-icon" aria-hidden="true">{{ icon }}</span>
      }
      <span class="nav-item-label">{{ label }}</span>
      @if (badge !== null && badge !== undefined && badge !== '') {
        <yaro-badge
          class="nav-item-badge"
          [intent]="badgeIntent"
          size="sm">{{ badge }}</yaro-badge>
      }
    </button>
  `,
})
export class YaroNavItemComponent {
  @Input() label:       string      = '';
  @Input() icon:        string      = '';
  @Input() active:      boolean     = false;
  @Input() badge:       string | number = '';
  @Input() badgeIntent: BadgeIntent = 'accent';

  @Output() itemClick = new EventEmitter<void>();
}
