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

@Component({
  selector: 'ab-showcase-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent {
  @Input() term = '';
  @Output() search = new EventEmitter<string>();
  termControl!: FormControl;
  category!: Category;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.termControl = this.fb.control(this.term);
    this.termControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (searchTerm) => {
          this.term = searchTerm;
          this.search.next(this.term);
        },
      });
  }
}
