import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaroDataTableComponent, TableColumn } from './data-table.component';

const COLUMNS: TableColumn[] = [
  { key: 'nombre', header: 'Nombre',  type: 'text',   sortable: true },
  { key: 'ventas', header: 'Ventas',  type: 'number', sortable: true, align: 'right' },
  { key: 'estado', header: 'Estado',  type: 'badge',  intentFn: (r) => r['estado'] === 'Activo' ? 'green' : 'red' },
];

const ROWS = [
  { nombre: 'Ana',  ventas: 320, estado: 'Activo'   },
  { nombre: 'Luis', ventas: 180, estado: 'Inactivo' },
  { nombre: 'Zoe',  ventas: 500, estado: 'Activo'   },
];

describe('YaroDataTableComponent', () => {
  let fixture: ComponentFixture<YaroDataTableComponent>;
  let component: YaroDataTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [YaroDataTableComponent] }).compileComponents();
    fixture   = TestBed.createComponent(YaroDataTableComponent);
    component = fixture.componentInstance;
    component.columns = COLUMNS;
    component.rows    = ROWS;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render correct number of rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.dt-row:not(.dt-row--skeleton)');
    expect(rows.length).toBe(3);
  });

  it('should render skeleton rows when loading', () => {
    component.loading       = true;
    component.skeletonCount = 4;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.dt-row--skeleton').length).toBe(4);
  });

  it('should render empty message when rows is empty', () => {
    component.rows         = [];
    component.emptyMessage = 'Sin resultados';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dt-empty').textContent).toContain('Sin resultados');
  });

  it('should sort asc on first click of sortable column', () => {
    component.toggleSort(COLUMNS[0]);
    expect(component.sortKey).toBe('nombre');
    expect(component.sortDir).toBe('asc');
    expect(component.sortedRows[0]['nombre']).toBe('Ana');
  });

  it('should sort desc on second click of same column', () => {
    component.toggleSort(COLUMNS[0]);
    component.toggleSort(COLUMNS[0]);
    expect(component.sortDir).toBe('desc');
    expect(component.sortedRows[0]['nombre']).toBe('Zoe');
  });

  it('should emit rowClick when rowClickable=true', () => {
    component.rowClickable = true;
    fixture.detectChanges();
    const emitted: unknown[] = [];
    component.rowClick.subscribe((r) => emitted.push(r));
    fixture.nativeElement.querySelector('.dt-row--clickable').click();
    expect(emitted.length).toBe(1);
  });
});
