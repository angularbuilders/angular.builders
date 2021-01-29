import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemsService } from '../../core/services/items.service';
import { SearchStoreService } from './services/search-store.service';

@Component({
  selector: 'ab-showcase-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  params$: Observable<{ term: string; sortBy: string }>;
  results$ = this.store.selectResults$();
  status$ = this.store.selectStatus$();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private items: ItemsService,
    private store: SearchStoreService
  ) {
    route.queryParams.subscribe({
      next: (queryParams) => this.store.storeQueryParams(queryParams),
    });
    this.params$ = this.store.selectParams$().pipe(
      tap((params) => {
        if (params.term.length >= 2) {
          this.items.getByQuery$(params).subscribe({
            next: (items) => this.store.storeItems(items),
            error: (error) => this.store.storeError(error),
          });
        } else {
          this.store.storeItems([]);
        }
      })
    );
  }

  search(term: string) {
    if (term != '[object Event]')
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { term: term },
        queryParamsHandling: 'merge',
      });
  }
}
