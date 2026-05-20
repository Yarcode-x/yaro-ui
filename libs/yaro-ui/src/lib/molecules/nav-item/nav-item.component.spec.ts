import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroNavItemComponent } from './nav-item.component';

describe('YaroNavItemComponent', () => {
  let fixture: ComponentFixture<YaroNavItemComponent>;
  let component: YaroNavItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroNavItemComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should apply active class when active=true', () => {
    component.active = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.nav-item').classList).toContain('nav-item--active');
  });

  it('should set aria-current="page" when active', () => {
    component.active = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').getAttribute('aria-current')).toBe('page');
  });

  it('should emit itemClick on click', () => {
    const emitted: void[] = [];
    component.itemClick.subscribe(() => emitted.push());
    fixture.nativeElement.querySelector('button').click();
    expect(emitted.length).toBe(1);
  });

  it('should render badge when badge is provided', () => {
    component.badge = 3;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('yaro-badge')).not.toBeNull();
  });

  it('should not render badge when badge is empty', () => {
    component.badge = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('yaro-badge')).toBeNull();
  });
});
