import { Card } from '@angular.builders/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../core/services/items.service';

@Component({
  selector: 'ab-showcase-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  searchText = '';
  categoryCards!: Card[];
  featuredCards!: Card[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resource: ItemsService
  ) {}

  ngOnInit(): void {
    this.categoryCards = this.route.snapshot.data.categories;
    this.featuredCards = this.route.snapshot.data.resources;
  }
  searchResources(searchText: string | unknown) {
    if (typeof searchText === 'string') {
      this.searchText = searchText;
      this.router.navigate(['/search'], {
        queryParams: { term: this.searchText, sortBy: 'name' },
      });
    }
  }
}
