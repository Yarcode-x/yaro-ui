import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'yaro-topbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './topbar.component.scss',
  template: `
    <header class="topbar" role="banner">

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
  @Input() title:    string = '';
  @Input() subtitle: string = '';
}
