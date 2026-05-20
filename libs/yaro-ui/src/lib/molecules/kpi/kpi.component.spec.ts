import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroKpiComponent } from './kpi.component';

describe('YaroKpiComponent', () => {
  let fixture: ComponentFixture<YaroKpiComponent>;
  let component: YaroKpiComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroKpiComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render label and value', () => {
    component.label = 'Ventas hoy';
    component.value = '$18.4M';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.kpi-label').textContent).toContain('Ventas hoy');
    expect(fixture.nativeElement.querySelector('.kpi-value').textContent).toContain('$18.4M');
  });

  it('should not render footer when delta is undefined', () => {
    component.delta = undefined;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.kpi-footer')).toBeNull();
  });

  it('should render yaro-delta when delta is provided', () => {
    component.delta = 12.5;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('yaro-delta')).not.toBeNull();
  });

  it('should render badge when badge text is provided', () => {
    component.badge = 'Activo';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('yaro-badge')).not.toBeNull();
  });
});
