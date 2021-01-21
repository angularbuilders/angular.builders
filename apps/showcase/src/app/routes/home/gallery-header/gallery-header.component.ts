import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'ab-showcase-gallery-header',
  templateUrl: './gallery-header.component.html',
  styleUrls: ['./gallery-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryHeaderComponent {
  @Output() search = new EventEmitter<string>();
  searchText!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearchChange(event: any) {
    this.searchText = event.target.value;
  }
  onSearchSubmit() {
    this.search.next(this.searchText);
  }
}
