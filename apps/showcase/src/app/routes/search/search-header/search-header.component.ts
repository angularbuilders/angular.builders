import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Category } from '../../../core/models/Category';
import { SearchParams } from '../../../core/models/SearchParams';

@Component({
  selector: 'ab-showcase-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent {
  @Input() term = '';
  @Output() search = new EventEmitter<SearchParams>();
  searchControl: FormControl;
  category!: Category;

  constructor(private fb: FormBuilder) {
    this.searchControl = this.fb.control('');
  }
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        // ! This way does not clear the input box
        // filter((searchTerm) => searchTerm.length >= 2),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: (searchTerm) => {
          this.term = searchTerm;
          this.search.next({ term: this.term });
        },
      });
  }
}
