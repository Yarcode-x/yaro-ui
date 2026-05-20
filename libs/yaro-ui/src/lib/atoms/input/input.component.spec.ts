import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroInputComponent } from './input.component';

describe('YaroInputComponent', () => {
  let fixture: ComponentFixture<YaroInputComponent>;
  let component: YaroInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YaroInputComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(YaroInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label when provided', () => {
    component.label = 'Nombre';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.field-label').textContent).toContain('Nombre');
  });

  it('should not render label when not provided', () => {
    expect(fixture.nativeElement.querySelector('.field-label')).toBeNull();
  });

  it('should render error message', () => {
    component.error = 'Campo requerido';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.field-error').textContent).toContain('Campo requerido');
  });

  it('should update value via writeValue', () => {
    component.writeValue('test');
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('test');
  });

  it('should call onChange on input event', () => {
    const spy = jest.fn();
    component.registerOnChange(spy);
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'nuevo valor';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('nuevo valor');
  });
});
