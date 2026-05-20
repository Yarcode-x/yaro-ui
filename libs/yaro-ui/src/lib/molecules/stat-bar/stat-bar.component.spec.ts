import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroStatBarComponent } from './stat-bar.component';

describe('YaroStatBarComponent', () => {
  let fixture: ComponentFixture<YaroStatBarComponent>;
  let component: YaroStatBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroStatBarComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroStatBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should clamp percentage to 100 when value > max', () => {
    component.value = 150;
    component.max   = 100;
    fixture.detectChanges();
    const fill = fixture.nativeElement.querySelector('.stat-bar-fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  it('should calculate percentage correctly', () => {
    component.value = 75;
    component.max   = 100;
    fixture.detectChanges();
    const fill = fixture.nativeElement.querySelector('.stat-bar-fill') as HTMLElement;
    expect(fill.style.width).toBe('75%');
  });

  it('should apply intent class to fill', () => {
    component.value  = 50;
    component.intent = 'green';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stat-bar-fill').classList).toContain('stat-bar-fill--green');
  });
});
