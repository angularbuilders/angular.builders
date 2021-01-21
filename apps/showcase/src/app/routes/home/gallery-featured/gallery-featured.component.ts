import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ab-showcase-gallery-featured',
  templateUrl: './gallery-featured.component.html',
  styleUrls: ['./gallery-featured.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryFeaturedComponent {
  title = 'Featured';
  @Input() featured!: unknown[];
}
