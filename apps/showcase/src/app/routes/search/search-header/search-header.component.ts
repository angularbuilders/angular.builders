import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Category } from '../../../core/models/Category';
import { SearchParams } from '../../../core/models/SearchParams';

@Component({
  selector: 'ab-showcase-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent {
  @Input() resultsCount = 0;
  @Input() sortBy: string | undefined = 'Name';
  @Input() term = '';
  @Output() search = new EventEmitter<SearchParams>();
  category!: Category;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearchChange(event: any) {
    this.term = event.target.value;
  }
  onSearchSubmit() {
    this.search.next({ term: this.term, sortBy: this.sortBy });
  }
}
