import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type InfoBoxIntent = 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'neutral';

const ICONS: Record<InfoBoxIntent, string> = {
  green:   '✓',
  red:     '✕',
  amber:   '⚠',
  blue:    'ℹ',
  purple:  '◈',
  neutral: '·',
};

@Component({
  selector: 'yaro-info-box',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './info-box.component.scss',
  template: `
    <div class="info-box" [class]="hostClass" role="note">
      <span class="info-box-icon" aria-hidden="true">{{ resolvedIcon }}</span>
      <div class="info-box-content">
        @if (title) {
          <div class="info-box-title">{{ title }}</div>
        }
        <div class="info-box-body">
          <ng-content />
        </div>
      </div>
    </div>
  `,
})
export class YaroInfoBoxComponent {
  @Input() intent: InfoBoxIntent = 'neutral';
  @Input() title:  string        = '';
  @Input() icon:   string        = '';

  get hostClass():    string { return `info-box--${this.intent}`; }
  get resolvedIcon(): string { return this.icon || ICONS[this.intent]; }
}
