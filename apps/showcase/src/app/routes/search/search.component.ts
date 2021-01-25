import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchParams } from '../../core/models/SearchParams';

@Component({
  selector: 'ab-showcase-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchParams$: Observable<SearchParams>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.searchParams$ = (route.queryParams as Observable<SearchParams>).pipe(
      map((searchParams) => {
        return {
          term: searchParams.term ?? '',
          sortBy: searchParams.sortBy ?? 'name',
        };
      })
    );
  }

  search(searchParams: SearchParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: searchParams,
      queryParamsHandling: 'merge',
    });
  }
}
