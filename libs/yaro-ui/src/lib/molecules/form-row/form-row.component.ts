import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type FormRowCols = 1 | 2 | 3;

@Component({
  selector: 'yaro-form-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './form-row.component.scss',
  template: `
    <div class="form-row">
      @if (label) {
        <div class="form-row-header">
          <span class="form-row-label">
            {{ label }}
            @if (required) { <span class="form-row-required" aria-hidden="true">*</span> }
          </span>
          @if (hint) {
            <span class="form-row-hint">{{ hint }}</span>
          }
        </div>
      }
      <div class="form-row-fields" [class]="fieldsClass">
        <ng-content />
      </div>
    </div>
  `,
})
export class YaroFormRowComponent {
  @Input() label:    string      = '';
  @Input() hint:     string      = '';
  @Input() cols:     FormRowCols = 1;
  @Input() required: boolean     = false;

  get fieldsClass(): string {
    return `form-row-fields--cols-${this.cols}`;
  }
}
