import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '../../../core/models/Item';

@Component({
  selector: 'ab-showcase-search-gallery-resources',
  templateUrl: './search-gallery-resources.component.html',
  styleUrls: ['./search-gallery-resources.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchGalleryResourcesComponent {
  @Input() results: Item[] | null = [];
  @Input() sortBy: string | undefined = 'Name';
  @Input() term = '';
}
