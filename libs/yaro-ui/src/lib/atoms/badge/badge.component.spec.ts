import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroBadgeComponent } from './badge.component';

describe('YaroBadgeComponent', () => {
  let fixture: ComponentFixture<YaroBadgeComponent>;
  let component: YaroBadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YaroBadgeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(YaroBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to neutral md', () => {
    expect(component.classes).toBe('badge badge--neutral badge--md');
  });

  it('should apply intent class', () => {
    component.intent = 'red';
    expect(component.classes).toContain('badge--red');
  });

  it('should render dot when dot=true', () => {
    component.dot = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge-dot')).not.toBeNull();
  });

  it('should not render dot by default', () => {
    expect(fixture.nativeElement.querySelector('.badge-dot')).toBeNull();
  });
});
