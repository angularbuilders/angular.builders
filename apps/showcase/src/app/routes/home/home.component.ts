import { Category, Resource, ResourcesService } from '@angular.builders/data';
import { Card } from '@angular.builders/ui';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchText = '';
  categoryCards!: Card[];
  featuredCards$!: Observable<Card[]>;

  // ToDo: Take transformation functions out of the component

  constructor(
    private route: ActivatedRoute,
    private resource: ResourcesService
  ) {}

  ngOnInit(): void {
    const categories = this.route.snapshot.data.categories;
    this.categoryCards = categories.map((category: Category) => {
      return { title: category.name, description: category.description };
    });
    this.featuredCards$ = this.resource.getFeatured$().pipe(
      map((resources: Resource[]) => {
        return resources.map((resource: Resource) => {
          return {
            title: resource.name,
            description: resource.description || '',
          };
        });
      })
    );
  }
  searchResources(searchText: string) {
    // ToDo: dispatch action
    this.searchText = searchText;
  }
}
