import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../core/models/Category';
import { Item } from '../../../core/models/Item';
import { CategoriesService } from '../../../core/services/categories.service';
import { ItemsService } from '../../../core/services/items.service';

@Component({
  selector: 'ab-showcase-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  categories$: Observable<Category[]>;

  constructor(
    private items: ItemsService,
    private categoriesService: CategoriesService
  ) {
    this.categories$ = this.categoriesService.getAll$();
  }

  onSave(item: Item) {
    this.items.save$(item).subscribe();
  }
}
