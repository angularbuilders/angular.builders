import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SearchParams } from '../../core/models/SearchParams';
import { ItemsService } from '../../core/services/items.service';
import { SearchStoreService } from './services/search.store.service';

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
    this.params$ = route.queryParams.pipe(
      map((queryParams) => queryParams as SearchParams),
      tap((searchParams) => {
        this.store.saveSearchParams(searchParams);
        this.getItemsOnParamsChange(searchParams);
      })
    );
  }

  private getItemsOnParamsChange(params: SearchParams) {
    if (params.term?.length >= 2) {
      this.store.saveSearchingStaus();
      this.items.getByQuery$(params).subscribe({
        next: (items) => this.store.saveItems(items),
        error: (error) => this.store.saveError(error),
      });
    } else {
      this.store.saveItems([]);
    }
  }

  search(term: string) {
    if (term != '[object Event]') {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { term: term },
        queryParamsHandling: 'merge',
      });
    }
  }
}
