import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { YaroBadgeComponent, BadgeIntent } from '../../atoms/badge/badge.component';
import { YaroDeltaComponent } from '../../atoms/delta/delta.component';

export interface TableColumn<T = Record<string, unknown>> {
  key:       string;
  header:    string;
  type?:     'text' | 'number' | 'badge' | 'delta';
  align?:    'left' | 'center' | 'right';
  width?:    string;
  sortable?: boolean;
  // badge: función que recibe la fila y devuelve el intent
  intentFn?: (row: T) => BadgeIntent;
  // delta: true cuando un valor negativo es bueno (ej. reducción de costo)
  inverted?: boolean;
}

type SortDir = 'asc' | 'desc';

@Component({
  selector: 'yaro-data-table',
  standalone: true,
  imports: [YaroBadgeComponent, YaroDeltaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data-table.component.scss',
  template: `
    <div class="dt-wrap">
      <table class="dt" role="grid">

        <thead class="dt-head">
          <tr>
            @for (col of columns; track col.key) {
              <th
                class="dt-th"
                [class.dt-th--sortable]="col.sortable"
                [class.dt-th--sorted]="sortKey === col.key"
                [style.width]="col.width ?? null"
                [style.textAlign]="col.align ?? 'left'"
                [attr.aria-sort]="sortAriaLabel(col)"
                (click)="toggleSort(col)">
                <span class="dt-th-inner">
                  {{ col.header }}
                  @if (col.sortable) {
                    <span class="dt-sort-icon" aria-hidden="true">
                      {{ sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕' }}
                    </span>
                  }
                </span>
              </th>
            }
          </tr>
        </thead>

        <tbody class="dt-body">
          @if (loading) {
            @for (i of skeletonRows; track i) {
              <tr class="dt-row dt-row--skeleton">
                @for (col of columns; track col.key) {
                  <td class="dt-td"><div class="dt-skeleton"></div></td>
                }
              </tr>
            }
          } @else if (sortedRows.length === 0) {
            <tr>
              <td class="dt-empty" [attr.colspan]="columns.length">{{ emptyMessage }}</td>
            </tr>
          } @else {
            @for (row of sortedRows; track trackRow(row, $index)) {
              <tr
                class="dt-row"
                [class.dt-row--clickable]="rowClickable"
                (click)="rowClickable && rowClick.emit(row)">
                @for (col of columns; track col.key) {
                  <td
                    class="dt-td"
                    [class]="'dt-td--' + (col.type ?? 'text')"
                    [style.textAlign]="col.align ?? 'left'">
                    @switch (col.type) {
                      @case ('badge') {
                        <yaro-badge
                          [intent]="col.intentFn ? col.intentFn(row) : 'neutral'"
                          size="sm">{{ cellValue(row, col.key) }}</yaro-badge>
                      }
                      @case ('delta') {
                        <yaro-delta
                          [value]="numericValue(row, col.key)"
                          [inverted]="col.inverted ?? false" />
                      }
                      @case ('number') {
                        <span class="dt-number">{{ cellValue(row, col.key) }}</span>
                      }
                      @default {
                        {{ cellValue(row, col.key) }}
                      }
                    }
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
})
export class YaroDataTableComponent {
  @Input() columns:       TableColumn[]              = [];
  @Input() rows:          Record<string, unknown>[]  = [];
  @Input() loading:       boolean                    = false;
  @Input() emptyMessage:  string                     = 'Sin datos para mostrar';
  @Input() rowClickable:  boolean                    = false;
  @Input() skeletonCount: number                     = 5;
  @Input() trackByKey:    string | null              = null;

  @Output() rowClick = new EventEmitter<Record<string, unknown>>();

  sortKey: string | null = null;
  sortDir: SortDir       = 'asc';

  get skeletonRows(): number[] {
    return Array.from({ length: this.skeletonCount }, (_, i) => i);
  }

  get sortedRows(): Record<string, unknown>[] {
    if (!this.sortKey) return this.rows;
    const key = this.sortKey;
    return [...this.rows].sort((a, b) => {
      const av = a[key], bv = b[key];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return this.sortDir === 'asc' ? cmp : -cmp;
    });
  }

  toggleSort(col: TableColumn): void {
    if (!col.sortable) return;
    if (this.sortKey === col.key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = col.key;
      this.sortDir = 'asc';
    }
  }

  sortAriaLabel(col: TableColumn): string | null {
    if (!col.sortable) return null;
    if (this.sortKey !== col.key) return 'none';
    return this.sortDir === 'asc' ? 'ascending' : 'descending';
  }

  trackRow(row: Record<string, unknown>, index: number): unknown {
    return this.trackByKey ? row[this.trackByKey] : index;
  }

  cellValue(row: Record<string, unknown>, key: string): unknown {
    return row[key] ?? '—';
  }

  numericValue(row: Record<string, unknown>, key: string): number {
    return Number(row[key]) || 0;
  }
}
