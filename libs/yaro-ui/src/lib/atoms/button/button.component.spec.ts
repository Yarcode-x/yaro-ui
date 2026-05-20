import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroButtonComponent } from './button.component';

describe('YaroButtonComponent', () => {
  let fixture: ComponentFixture<YaroButtonComponent>;
  let component: YaroButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YaroButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(YaroButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct class for primary md (defaults)', () => {
    expect(component.classes).toBe('btn btn--primary btn--md');
  });

  it('should reflect variant and size in classes', () => {
    component.variant = 'secondary';
    component.size    = 'lg';
    expect(component.classes).toBe('btn btn--secondary btn--lg');
  });

  it('should disable the native button when disabled=true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBe(true);
  });

  it('should disable the native button when loading=true', () => {
    component.loading = true;
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBe(true);
  });

  it('should render spinner only when loading', () => {
    expect(fixture.nativeElement.querySelector('.btn-spinner')).toBeNull();
    component.loading = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.btn-spinner')).not.toBeNull();
  });
});
