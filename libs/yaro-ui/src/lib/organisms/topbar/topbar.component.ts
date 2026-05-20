import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'yaro-topbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './topbar.component.scss',
  template: `
    <header class="topbar" role="banner">

      <button
        class="topbar-menu-btn"
        type="button"
        aria-label="Abrir menú de navegación"
        (click)="menuToggle.emit()">
        <span class="topbar-menu-icon"></span>
      </button>

      <div class="topbar-start">
        <ng-content select="[topbar-brand]" />
        @if (title) {
          <div class="topbar-title-block">
            <span class="topbar-title">{{ title }}</span>
            @if (subtitle) {
              <span class="topbar-subtitle">{{ subtitle }}</span>
            }
          </div>
        }
      </div>

      <div class="topbar-center">
        <ng-content select="[topbar-center]" />
      </div>

      <div class="topbar-end">
        <ng-content select="[topbar-actions]" />
      </div>

    </header>
  `,
})
export class YaroTopbarComponent {
  @Input()  title:    string = '';
  @Input()  subtitle: string = '';
  @Output() menuToggle = new EventEmitter<void>();
}
