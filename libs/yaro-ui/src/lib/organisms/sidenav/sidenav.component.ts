import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { YaroNavItemComponent } from '../../molecules/nav-item/nav-item.component';
import { BadgeIntent } from '../../atoms/badge/badge.component';

export interface SidenavItem {
  id:           string;
  label:        string;
  icon?:        string;
  badge?:       string | number;
  badgeIntent?: BadgeIntent;
}

export interface SidenavSection {
  label?: string;
  items:  SidenavItem[];
}

@Component({
  selector: 'yaro-sidenav',
  standalone: true,
  imports: [YaroNavItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './sidenav.component.scss',
  template: `
    <nav
      class="sidenav"
      [class.sidenav--collapsed]="collapsed"
      [class.sidenav--mobile-open]="mobileOpen"
      [attr.aria-label]="navLabel">

      <div class="sidenav-brand">
        <ng-content select="[sidenav-brand]" />
      </div>

      <div class="sidenav-body">
        @for (section of sections; track section.label ?? $index) {
          <div class="sidenav-section">
            @if (section.label && !collapsed) {
              <span class="sidenav-section-label">{{ section.label }}</span>
            }
            @for (item of section.items; track item.id) {
              <yaro-nav-item
                [label]="collapsed ? '' : item.label"
                [icon]="item.icon ?? ''"
                [active]="activeId === item.id"
                [badge]="collapsed ? '' : (item.badge ?? '')"
                [badgeIntent]="item.badgeIntent ?? 'accent'"
                [attr.title]="collapsed ? item.label : null"
                (itemClick)="onItemClick(item.id)" />
            }
          </div>
        }
      </div>

      <div class="sidenav-footer">
        <ng-content select="[sidenav-footer]" />
      </div>
    </nav>

    <div
      class="sidenav-overlay"
      aria-hidden="true"
      (click)="mobileClose.emit()">
    </div>
  `,
})
export class YaroSidenavComponent {
  @Input() sections:   SidenavSection[] = [];
  @Input() activeId:   string           = '';
  @Input() collapsed:  boolean          = false;
  @Input() mobileOpen: boolean          = false;
  @Input() navLabel:   string           = 'Navegación principal';

  @Output() itemSelect     = new EventEmitter<string>();
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() mobileClose    = new EventEmitter<void>();

  onItemClick(id: string): void {
    this.itemSelect.emit(id);
    this.mobileClose.emit();
  }

  selectItem(id: string): void {
    this.itemSelect.emit(id);
  }
}
