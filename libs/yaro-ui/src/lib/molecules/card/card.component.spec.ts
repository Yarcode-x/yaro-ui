import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroCardComponent } from './card.component';

describe('YaroCardComponent', () => {
  let fixture: ComponentFixture<YaroCardComponent>;
  let component: YaroCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroCardComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should default to pad-md shadow-md', () => {
    expect(component.classes).toBe('card card--pad-md card--shadow-md');
  });

  it('should render title when provided', () => {
    component.title = 'Ventas';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.card-title').textContent.trim()).toBe('Ventas');
  });

  it('should not render header when title is empty', () => {
    expect(fixture.nativeElement.querySelector('.card-header')).toBeNull();
  });
});
