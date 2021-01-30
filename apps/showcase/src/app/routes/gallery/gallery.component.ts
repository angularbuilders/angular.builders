import { Card } from '@angular.builders/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  categoryCards$: Observable<Card[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categories: CategoriesService,
    private categoriesStore: CategoriesStoreService
  ) {
    this.categories.getAll$().subscribe({
      next: (categories) => this.categoriesStore.storeCategories(categories),
    });
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
    this.categoryCards$ = categoriesStore
      .select$((s) => s.categories)
      .pipe(map(this.categories.transformToCards));
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
