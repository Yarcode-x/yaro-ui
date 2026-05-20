import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { YaroDeltaComponent } from '../../atoms/delta/delta.component';
import { YaroBadgeComponent, BadgeIntent } from '../../atoms/badge/badge.component';

@Component({
  selector: 'yaro-kpi',
  standalone: true,
  imports: [YaroDeltaComponent, YaroBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './kpi.component.scss',
  template: `
    <div class="kpi">
      <div class="kpi-top">
        <span class="kpi-label">{{ label }}</span>
        @if (badge) {
          <yaro-badge [intent]="badgeIntent" size="sm" [dot]="true">{{ badge }}</yaro-badge>
        }
      </div>

      <div class="kpi-value">{{ value }}</div>

      @if (delta !== undefined) {
        <div class="kpi-footer">
          <yaro-delta [value]="delta" [inverted]="deltaInverted" />
          @if (compareLabel) {
            <span class="kpi-compare">{{ compareLabel }}</span>
          }
        </div>
      }
    </div>
  `,
})
export class YaroKpiComponent {
  @Input() label:          string      = '';
  @Input() value:          string | number = '—';
  @Input() delta:          number | undefined;
  @Input() deltaInverted:  boolean     = false;
  @Input() compareLabel:   string      = 'vs. ayer';
  @Input() badge:          string      = '';
  @Input() badgeIntent:    BadgeIntent = 'neutral';
}
