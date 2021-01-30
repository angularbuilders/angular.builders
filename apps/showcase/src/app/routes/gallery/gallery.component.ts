import { Card } from '@angular.builders/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.storeLoadedCategories();
    this.fillCountOnCategoriesLoaded(categoriesStore);
    this.transformToCardsOnCategoriesFilled(categoriesStore);
  }

  private transformToCardsOnCategoriesFilled(
    categoriesStore: CategoriesStoreService
  ) {
    this.categoryCards$ = categoriesStore.selectLoaded$().pipe(
      map((loaded) => {
        if (loaded) {
          return this.categories.transformToCards(
            categoriesStore.state.categories
          );
        } else {
          return [];
        }
      })
    );
    this.categoryCards$ = categoriesStore.selectFilled$().pipe(
      map((filled) => {
        if (filled) {
          return this.categories.transformToCards(
            categoriesStore.state.categories
          );
        } else {
          return [];
        }
      })
    );
  }

  private storeLoadedCategories() {
    this.categories.getAll$().subscribe({
      next: (categories) => this.categoriesStore.storeCategories(categories),
    });
  }

  private fillCountOnCategoriesLoaded(categoriesStore: CategoriesStoreService) {
    categoriesStore.selectLoaded$().subscribe({
      next: (loaded) => {
        if (loaded) {
          const counters$ = categoriesStore.state.categories.map((category) =>
            this.categories.getItemsCountById(category.id)
          );
          forkJoin(counters$).subscribe({
            next: (counters) => {
              counters.forEach((counter, index) => {
                const category = categoriesStore.state.categories[index];
                category.description += ' - With ' + counter + ' items';
                this.categoriesStore.storeCategoryChange(category);
              });
              this.categoriesStore.storeFilled(true);
            },
          });
        }
      },
    });
  }

  private fillCountOnCategoriesLoadedOLD(
    categoriesStore: CategoriesStoreService
  ) {
    categoriesStore.selectLoaded$().subscribe({
      next: (filled) => {
        if (filled) {
          // ToDo: emit every single change to each gallery card
          categoriesStore.state.categories.forEach((category) =>
            this.categories.getItemsCountById(category.id).subscribe({
              next: (counter) => {
                category.description += ' - With ' + counter + ' items';
                this.categoriesStore.storeCategoryChange(category);
              },
            })
          );
        }
      },
    });
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
