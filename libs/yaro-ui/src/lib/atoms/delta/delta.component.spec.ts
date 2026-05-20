import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroDeltaComponent } from './delta.component';

describe('YaroDeltaComponent', () => {
  let fixture: ComponentFixture<YaroDeltaComponent>;
  let component: YaroDeltaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YaroDeltaComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(YaroDeltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show ↑ for positive value', () => {
    component.value = 12.5;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.delta-arrow').textContent).toBe('↑');
  });

  it('should show ↓ for negative value', () => {
    component.value = -3.2;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.delta-arrow').textContent).toBe('↓');
  });

  it('should apply positive class for positive value', () => {
    component.value = 5;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.delta').classList).toContain('delta--positive');
  });

  it('should apply negative class for negative value', () => {
    component.value = -5;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.delta').classList).toContain('delta--negative');
  });

  it('should invert color logic when inverted=true', () => {
    component.value    = -5;
    component.inverted = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.delta').classList).toContain('delta--positive');
  });
});
