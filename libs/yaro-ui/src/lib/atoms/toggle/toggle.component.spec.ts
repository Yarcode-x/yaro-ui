import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroToggleComponent } from './toggle.component';

describe('YaroToggleComponent', () => {
  let fixture: ComponentFixture<YaroToggleComponent>;
  let component: YaroToggleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YaroToggleComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(YaroToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start unchecked by default', () => {
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(false);
  });

  it('should reflect writeValue', () => {
    component.writeValue(true);
    fixture.detectChanges();
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(true);
  });

  it('should emit valueChange on toggle', () => {
    const emitted: boolean[] = [];
    component.valueChange.subscribe((v: boolean) => emitted.push(v));
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    expect(emitted).toEqual([true]);
  });

  it('should render label when provided', () => {
    component.label = 'Activo';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toggle-label').textContent).toContain('Activo');
  });
});
