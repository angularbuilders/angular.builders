import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-showcase-search-gallery-resources',
  templateUrl: './search-gallery-resources.component.html',
  styleUrls: ['./search-gallery-resources.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchGalleryResourcesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
