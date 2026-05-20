import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroModalComponent } from './modal.component';

describe('YaroModalComponent', () => {
  let fixture: ComponentFixture<YaroModalComponent>;
  let component: YaroModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroModalComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should not render when open=false', () => {
    component.open = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal')).toBeNull();
  });

  it('should render when open=true', () => {
    component.open = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal')).not.toBeNull();
  });

  it('should render title when provided', () => {
    component.open  = true;
    component.title = 'Confirmar acción';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal-title').textContent).toContain('Confirmar acción');
  });

  it('should emit closed on close button click', () => {
    component.open     = true;
    component.closable = true;
    fixture.detectChanges();
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push());
    fixture.nativeElement.querySelector('.modal-close').click();
    expect(emitted.length).toBe(1);
  });

  it('should emit closed when backdrop is clicked', () => {
    component.open             = true;
    component.closeOnBackdrop  = true;
    fixture.detectChanges();
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push());
    component.onBackdropClick();
    expect(emitted.length).toBe(1);
  });

  it('should not emit closed when closeOnBackdrop=false', () => {
    component.open            = true;
    component.closeOnBackdrop = false;
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push());
    component.onBackdropClick();
    expect(emitted.length).toBe(0);
  });

  it('should apply size class', () => {
    component.open = true;
    component.size = 'lg';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal--lg')).not.toBeNull();
  });
});
