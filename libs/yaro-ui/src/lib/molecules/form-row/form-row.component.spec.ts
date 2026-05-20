import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroFormRowComponent } from './form-row.component';

describe('YaroFormRowComponent', () => {
  let fixture: ComponentFixture<YaroFormRowComponent>;
  let component: YaroFormRowComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroFormRowComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render label when provided', () => {
    component.label = 'Datos del cliente';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.form-row-label').textContent).toContain('Datos del cliente');
  });

  it('should not render header when label is empty', () => {
    expect(fixture.nativeElement.querySelector('.form-row-header')).toBeNull();
  });

  it('should show required asterisk when required=true', () => {
    component.label    = 'Nombre';
    component.required = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.form-row-required')).not.toBeNull();
  });

  it('should apply correct cols class', () => {
    component.cols = 2;
    expect(component.fieldsClass).toBe('form-row-fields--cols-2');
  });
});
