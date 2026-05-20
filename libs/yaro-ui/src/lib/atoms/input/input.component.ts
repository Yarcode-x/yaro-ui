import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yaro-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YaroInputComponent),
    multi: true,
  }],
  template: `
    <div class="field" [class.field--error]="error" [class.field--disabled]="isDisabled()">
      @if (label) {
        <label class="field-label" [for]="inputId">{{ label }}</label>
      }
      <input
        [id]="inputId"
        class="field-input"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="isDisabled()"
        [value]="value()"
        (input)="handleInput($event)"
        (blur)="handleBlur()"
      />
      @if (error) {
        <span class="field-error" role="alert">{{ error }}</span>
      } @else if (hint) {
        <span class="field-hint">{{ hint }}</span>
      }
    </div>
  `,
})
export class YaroInputComponent implements ControlValueAccessor {
  @Input() label       = '';
  @Input() placeholder = '';
  @Input() type        = 'text';
  @Input() error       = '';
  @Input() hint        = '';
  @Input() inputId     = `yaro-input-${Math.random().toString(36).slice(2, 7)}`;

  protected value      = signal('');
  protected isDisabled = signal(false);

  private onChange   = (_: unknown) => {};
  private onTouched  = () => {};

  writeValue(val: string): void          { this.value.set(val ?? ''); }
  registerOnChange(fn: typeof this.onChange): void  { this.onChange = fn; }
  registerOnTouched(fn: typeof this.onTouched): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void          { this.isDisabled.set(disabled); }

  protected handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  protected handleBlur(): void {
    this.onTouched();
  }
}
