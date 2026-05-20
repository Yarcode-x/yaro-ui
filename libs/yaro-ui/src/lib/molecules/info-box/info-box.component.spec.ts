import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { YaroInfoBoxComponent } from './info-box.component';

@Component({
  standalone: true,
  imports: [YaroInfoBoxComponent],
  template: `<yaro-info-box [intent]="intent" [title]="title">Mensaje de prueba</yaro-info-box>`,
})
class TestHostComponent {
  intent = 'neutral' as const;
  title  = '';
}

describe('YaroInfoBoxComponent', () => {
  let fixture: ComponentFixture<YaroInfoBoxComponent>;
  let component: YaroInfoBoxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroInfoBoxComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should apply intent class', () => {
    component.intent = 'red';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.info-box').classList).toContain('info-box--red');
  });

  it('should render title when provided', () => {
    component.title = 'Error DIAN';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.info-box-title').textContent).toContain('Error DIAN');
  });

  it('should not render title when empty', () => {
    expect(fixture.nativeElement.querySelector('.info-box-title')).toBeNull();
  });

  it('should use default icon per intent', () => {
    component.intent = 'amber';
    expect(component.resolvedIcon).toBe('⚠');
  });

  it('should use custom icon when provided', () => {
    component.icon = '🔔';
    expect(component.resolvedIcon).toBe('🔔');
  });
});
