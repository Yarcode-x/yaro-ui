import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroAvatarComponent } from './avatar.component';

describe('YaroAvatarComponent', () => {
  let fixture: ComponentFixture<YaroAvatarComponent>;
  let component: YaroAvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YaroAvatarComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(YaroAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should derive initials from name', () => {
    component.name = 'Yara Muñoz';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.avatar-initials').textContent.trim()).toBe('YM');
  });

  it('should use only first two words for initials', () => {
    component.name = 'Ana María Lopez García';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.avatar-initials').textContent.trim()).toBe('AM');
  });

  it('should render img when src is provided', () => {
    component.src  = 'https://example.com/photo.jpg';
    component.name = 'Test';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).not.toBeNull();
  });

  it('should apply size class', () => {
    component.size = 'lg';
    expect(component.classes).toContain('avatar--lg');
  });
});
