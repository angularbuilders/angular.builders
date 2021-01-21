import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../../models/Card';

@Component({
  selector: 'ab-ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  @Input() items!: unknown[];
  getCards(): Card[] {
    return this.items.map((i) => i as Card);
  }
}
