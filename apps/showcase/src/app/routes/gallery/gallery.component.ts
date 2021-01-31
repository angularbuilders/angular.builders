import { Card } from '@angular.builders/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CategoriesStoreService } from '../../core/services/categories-store.service';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'ab-showcase-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  searchText = '';
  featuredCards!: Card[];
  categoryCards$!: Observable<Card[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categories: CategoriesService,
    private categoriesStore: CategoriesStoreService
  ) {
    this.categoryCards$ = this.getCategoryCardsFilled$();
    // ToDo: do it en two steps to display categories before get their counters
  }

  private getCategoryCardsFilled$() {
    return this.categories.getAll$().pipe(
      tap((categories) => this.categoriesStore.saveCategories(categories)),
      switchMap((categories) => {
        const counters$ = categories.map((category) =>
          this.categories.getItemsCountById(category.id)
        );
        return forkJoin(counters$);
      }),
      map((counters) => {
        return counters.map((counter, index) => {
          const category = this.categoriesStore.state.categories[index];
          category.description += ' - With ' + counter + ' items';
          return category;
        });
      }),
      tap(() => this.categoriesStore.saveFilled(true)),
      map((categories) => this.categories.transformToCards(categories))
    );
  }

  ngOnInit(): void {
    this.featuredCards = this.route.snapshot.data.resources;
  }
  searchItems(searchText: string | unknown) {
    if (typeof searchText === 'string') {
      this.searchText = searchText;
      this.router.navigate(['/search'], {
        queryParams: { term: this.searchText, sortBy: 'name' },
      });
    }
  }
}
