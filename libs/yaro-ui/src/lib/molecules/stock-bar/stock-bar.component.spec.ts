import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroStockBarComponent } from './stock-bar.component';

describe('YaroStockBarComponent', () => {
  let fixture: ComponentFixture<YaroStockBarComponent>;
  let component: YaroStockBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroStockBarComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroStockBarComponent);
    component = fixture.componentInstance;
    component.max = 100;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be ok when above lowThreshold', () => {
    component.current = 80;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stock-bar').classList).toContain('stock-bar--ok');
  });

  it('should be low when between critical and low thresholds', () => {
    component.current          = 20;
    component.lowThreshold     = 30;
    component.criticalThreshold = 10;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stock-bar').classList).toContain('stock-bar--low');
  });

  it('should be critical when at or below criticalThreshold', () => {
    component.current           = 5;
    component.criticalThreshold = 10;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stock-bar').classList).toContain('stock-bar--critical');
  });

  it('should cap fill at 100%', () => {
    component.current = 200;
    fixture.detectChanges();
    const fill = fixture.nativeElement.querySelector('.stock-bar-fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });
});
