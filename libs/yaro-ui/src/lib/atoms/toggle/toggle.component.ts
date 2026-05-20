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

@Component({
  selector: 'yaro-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './toggle.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YaroToggleComponent),
    multi: true,
  }],
  template: `
    <label class="toggle" [class.toggle--disabled]="isDisabled()">
      <input
        type="checkbox"
        class="toggle-input"
        [checked]="checked()"
        [disabled]="isDisabled()"
        (change)="handleChange($event)"
      />
      <span class="toggle-track" aria-hidden="true">
        <span class="toggle-thumb"></span>
      </span>
      @if (label) {
        <span class="toggle-label">{{ label }}</span>
      }
    </label>
  `,
})
export class YaroToggleComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() set value(v: boolean) { this.checked.set(v); }

  @Output() valueChange = new EventEmitter<boolean>();

  protected checked    = signal(false);
  protected isDisabled = signal(false);

  private onChange  = (_: unknown) => {};
  private onTouched = () => {};

  writeValue(val: boolean): void            { this.checked.set(!!val); }
  registerOnChange(fn: typeof this.onChange): void   { this.onChange = fn; }
  registerOnTouched(fn: typeof this.onTouched): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void          { this.isDisabled.set(disabled); }

  protected handleChange(event: Event): void {
    const val = (event.target as HTMLInputElement).checked;
    this.checked.set(val);
    this.onChange(val);
    this.onTouched();
    this.valueChange.emit(val);
  }
}
