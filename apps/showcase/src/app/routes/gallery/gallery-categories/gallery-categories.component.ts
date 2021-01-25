import { Card } from '@angular.builders/ui';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ab-showcase-gallery-categories',
  templateUrl: './gallery-categories.component.html',
  styleUrls: ['./gallery-categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCategoriesComponent {
  title = 'Categories';
  @Input() categories!: Card[];
}
