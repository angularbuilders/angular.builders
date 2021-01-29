import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Item } from '../../core/models/Item';
import { SearchParams } from '../../core/models/SearchParams';
import { ItemsService } from '../../core/services/items.service';

@Component({
  selector: 'ab-showcase-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchParams: SearchParams = {
    term: '',
  };
  searchParams$: Observable<SearchParams>;
  results$: Observable<Item[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private items: ItemsService
  ) {
    const queryParams$ = route.queryParams as Observable<SearchParams>;
    this.searchParams$ = queryParams$.pipe(
      map((searchParams) => {
        return {
          term: searchParams.term ?? '',
          sortBy: searchParams.sortBy ?? 'name',
        };
      }),
      tap((searchParams) => (this.searchParams = searchParams))
    );
    // ToDo: alert user about minimum length
    this.results$ = this.searchParams$.pipe(
      filter((searchParams: SearchParams) => searchParams.term.length >= 2),
      switchMap((searchParams: SearchParams) =>
        this.items.getByQuery$(searchParams).pipe(startWith([]))
      )
    );
  }

  search(searchParams: SearchParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: searchParams,
      queryParamsHandling: 'merge',
    });
    // if (searchParams.term.length >= 2) {
    //   this.results$ = this.items.getByQuery$(searchParams).pipe(startWith([]));
    // } else {

    //   this.results$ = of([]);
    // }
  }
}
