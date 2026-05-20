import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

@Component({
  selector: 'yaro-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './modal.component.scss',
  template: `
    @if (open) {
      <div
        class="modal-overlay"
        role="presentation"
        (click)="onBackdropClick()">
      </div>
      <div
        class="modal modal--{{ size }}"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="title ? 'yaro-modal-title' : null"
        (click)="$event.stopPropagation()">

        @if (title || closable) {
          <div class="modal-header">
            @if (title) {
              <h2 class="modal-title" id="yaro-modal-title">{{ title }}</h2>
            }
            @if (closable) {
              <button
                class="modal-close"
                type="button"
                aria-label="Cerrar modal"
                (click)="close()">✕</button>
            }
          </div>
        }

        <div class="modal-body">
          <ng-content />
        </div>

        <ng-content select="[modal-footer]" />
      </div>
    }
  `,
})
export class YaroModalComponent {
  @Input() open:             boolean   = false;
  @Input() title:            string    = '';
  @Input() size:             ModalSize = 'md';
  @Input() closable:         boolean   = true;
  @Input() closeOnBackdrop:  boolean   = true;

  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscKey(): void {
    if (this.open && this.closable) this.close();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop && this.closable) this.close();
  }

  close(): void {
    this.closed.emit();
  }
}
