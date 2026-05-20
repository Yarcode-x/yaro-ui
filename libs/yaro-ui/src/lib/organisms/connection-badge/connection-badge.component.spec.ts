import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroConnectionBadgeComponent } from './connection-badge.component';

describe('YaroConnectionBadgeComponent', () => {
  let fixture: ComponentFixture<YaroConnectionBadgeComponent>;
  let component: YaroConnectionBadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroConnectionBadgeComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroConnectionBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should apply online class by default', () => {
    expect(fixture.nativeElement.querySelector('.connection--online')).not.toBeNull();
  });

  it('should apply correct class per status', () => {
    const statuses = ['online', 'offline', 'connecting', 'error'] as const;
    statuses.forEach(status => {
      component.status = status;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector(`.connection--${status}`)).not.toBeNull();
    });
  });

  it('should build displayLabel without service', () => {
    component.status = 'online';
    expect(component.displayLabel).toBe('En línea');
  });

  it('should build displayLabel with service', () => {
    component.status  = 'error';
    component.service = 'DIAN';
    expect(component.displayLabel).toBe('DIAN: Error');
  });

  it('should hide label when showLabel=false', () => {
    component.showLabel = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.connection-label')).toBeNull();
  });

  it('should have role=status for accessibility', () => {
    expect(fixture.nativeElement.querySelector('[role="status"]')).not.toBeNull();
  });
});
