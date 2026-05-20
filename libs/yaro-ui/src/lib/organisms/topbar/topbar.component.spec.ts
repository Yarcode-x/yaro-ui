import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroTopbarComponent } from './topbar.component';

describe('YaroTopbarComponent', () => {
  let fixture: ComponentFixture<YaroTopbarComponent>;
  let component: YaroTopbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroTopbarComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render title when provided', () => {
    component.title = 'Inventario';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.topbar-title').textContent.trim()).toBe('Inventario');
  });

  it('should render subtitle when provided', () => {
    component.title    = 'Inventario';
    component.subtitle = 'Farmacia Central';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.topbar-subtitle').textContent.trim()).toBe('Farmacia Central');
  });

  it('should not render title block when title is empty', () => {
    expect(fixture.nativeElement.querySelector('.topbar-title-block')).toBeNull();
  });

  it('should have role=banner on the header', () => {
    expect(fixture.nativeElement.querySelector('header').getAttribute('role')).toBe('banner');
  });
});
