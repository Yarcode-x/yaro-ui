import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroBienestarPickerComponent, BIENESTAR_OPTIONS } from './bienestar-picker.component';

describe('YaroBienestarPickerComponent', () => {
  let fixture: ComponentFixture<YaroBienestarPickerComponent>;
  let component: YaroBienestarPickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroBienestarPickerComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroBienestarPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render default 5 options', () => {
    const btns = fixture.nativeElement.querySelectorAll('.bienestar-opt');
    expect(btns.length).toBe(BIENESTAR_OPTIONS.length);
  });

  it('should select option on click', () => {
    const emitted: string[] = [];
    component.selectedChange.subscribe((v: string) => emitted.push(v));
    component.select('bien');
    expect(emitted).toEqual(['bien']);
  });

  it('should apply selected class to active option', () => {
    component.select('excelente');
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('.bienestar-opt');
    const selected = Array.from(buttons).filter((b: any) =>
      b.classList.contains('bienestar-opt--selected')
    );
    expect(selected.length).toBe(1);
  });

  it('should update via writeValue', () => {
    component.writeValue('regular');
    fixture.detectChanges();
    // Verifica que el aria-checked esté en el botón correcto
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('.bienestar-opt');
    const checkedBtn = Array.from(buttons).find(b => b.getAttribute('aria-checked') === 'true');
    expect(checkedBtn?.querySelector('.bienestar-opt-label')?.textContent?.trim()).toBe('Regular');
  });

  it('should use custom options when provided', () => {
    component.options = [
      { id: 'a', label: 'Opción A', icon: '⭐', color: 'green' },
    ];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.bienestar-opt').length).toBe(1);
  });
});
