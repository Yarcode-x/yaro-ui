import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';

export type AvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'yaro-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './avatar.component.scss',
  template: `
    <div [class]="classes" [attr.aria-label]="name || null">
      @if (src && !imgError()) {
        <img
          [src]="src"
          [alt]="name"
          class="avatar-img"
          (error)="imgError.set(true)"
        />
      } @else {
        <span class="avatar-initials" aria-hidden="true">{{ initials() }}</span>
      }
    </div>
  `,
})
export class YaroAvatarComponent {
  @Input() src  = '';
  @Input() name = '';
  @Input() size: AvatarSize = 'md';

  protected imgError = signal(false);

  protected initials = computed(() =>
    this.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase() ?? '')
      .join('')
  );

  get classes(): string {
    return `avatar avatar--${this.size}`;
  }
}
