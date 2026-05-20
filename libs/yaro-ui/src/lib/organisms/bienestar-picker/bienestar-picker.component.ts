import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface BienestarOption {
  id:    string;
  label: string;
  icon:  string;
  color: string;  // CSS var o hex
}

export const BIENESTAR_OPTIONS: BienestarOption[] = [
  { id: 'excelente', label: 'Excelente', icon: '😊', color: 'var(--color-green)'  },
  { id: 'bien',      label: 'Bien',      icon: '🙂', color: 'var(--color-green)'  },
  { id: 'regular',   label: 'Regular',   icon: '😐', color: 'var(--color-amber)'  },
  { id: 'cansado',   label: 'Cansado/a', icon: '😴', color: 'var(--color-amber)'  },
  { id: 'mal',       label: 'Mal',       icon: '😣', color: 'var(--color-red)'    },
];

@Component({
  selector: 'yaro-bienestar-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './bienestar-picker.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YaroBienestarPickerComponent),
    multi: true,
  }],
  template: `
    <div class="bienestar" [class.bienestar--disabled]="isDisabled()">
      @if (label) {
        <p class="bienestar-label">{{ label }}</p>
      }
      <div class="bienestar-options" role="radiogroup" [attr.aria-label]="label || 'Bienestar del turno'">
        @for (opt of resolvedOptions; track opt.id) {
          <button
            class="bienestar-opt"
            [class.bienestar-opt--selected]="selected() === opt.id"
            type="button"
            role="radio"
            [attr.aria-checked]="selected() === opt.id"
            [disabled]="isDisabled()"
            (click)="select(opt.id)">
            <span class="bienestar-opt-icon">{{ opt.icon }}</span>
            <span class="bienestar-opt-label">{{ opt.label }}</span>
            <span
              class="bienestar-opt-indicator"
              [style.background]="opt.color">
            </span>
          </button>
        }
      </div>
    </div>
  `,
})
export class YaroBienestarPickerComponent implements ControlValueAccessor {
  @Input() label:   string              = '';
  @Input() options: BienestarOption[]   = [];

  @Output() selectedChange = new EventEmitter<string>();

  protected selected    = signal('');
  protected isDisabled  = signal(false);

  get resolvedOptions(): BienestarOption[] {
    return this.options.length ? this.options : BIENESTAR_OPTIONS;
  }

  private onChange  = (_: unknown) => {};
  private onTouched = () => {};

  writeValue(val: string): void          { this.selected.set(val ?? ''); }
  registerOnChange(fn: typeof this.onChange): void   { this.onChange = fn; }
  registerOnTouched(fn: typeof this.onTouched): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void          { this.isDisabled.set(disabled); }

  select(id: string): void {
    this.selected.set(id);
    this.onChange(id);
    this.onTouched();
    this.selectedChange.emit(id);
  }
}
