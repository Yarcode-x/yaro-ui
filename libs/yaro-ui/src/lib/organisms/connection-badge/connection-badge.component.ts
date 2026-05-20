import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type ConnectionStatus = 'online' | 'offline' | 'connecting' | 'error';

interface StatusConfig {
  label:   string;
  cssClass: string;
}

const STATUS_CONFIG: Record<ConnectionStatus, StatusConfig> = {
  online:     { label: 'En línea',     cssClass: 'connection--online'     },
  connecting: { label: 'Conectando…',  cssClass: 'connection--connecting' },
  offline:    { label: 'Sin conexión', cssClass: 'connection--offline'    },
  error:      { label: 'Error',        cssClass: 'connection--error'      },
};

@Component({
  selector: 'yaro-connection-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './connection-badge.component.scss',
  template: `
    <div
      class="connection"
      [class]="config.cssClass"
      [attr.title]="displayLabel"
      role="status"
      [attr.aria-label]="displayLabel">
      <span class="connection-dot" aria-hidden="true"></span>
      @if (showLabel) {
        <span class="connection-label">
          @if (service) { <span class="connection-service">{{ service }}</span> }
          {{ config.label }}
        </span>
      }
    </div>
  `,
})
export class YaroConnectionBadgeComponent {
  @Input() status:    ConnectionStatus = 'online';
  @Input() service:   string           = '';
  @Input() showLabel: boolean          = true;

  get config(): StatusConfig      { return STATUS_CONFIG[this.status]; }
  get displayLabel(): string {
    return this.service
      ? `${this.service}: ${this.config.label}`
      : this.config.label;
  }
}
