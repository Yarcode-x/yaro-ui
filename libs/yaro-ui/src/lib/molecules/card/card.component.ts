import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardShadow  = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'yaro-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card.component.scss',
  template: `
    <div [class]="classes">
      @if (title) {
        <div class="card-header">
          <span class="card-title">{{ title }}</span>
          <ng-content select="[card-actions]" />
        </div>
      }
      <div class="card-body">
        <ng-content />
      </div>
    </div>
  `,
})
export class YaroCardComponent {
  @Input() title:   string = '';
  @Input() padding: CardPadding = 'md';
  @Input() shadow:  CardShadow  = 'md';

  get classes(): string {
    return `card card--pad-${this.padding} card--shadow-${this.shadow}`;
  }
}
