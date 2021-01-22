import { Category, Resource, ResourcesService } from '@angular.builders/data';
import { Card } from '@angular.builders/ui';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchText = '';
  categoryCards!: Card[];
  featuredCards$!: Observable<Card[]>;

  constructor(
    private route: ActivatedRoute,
    private resource: ResourcesService
  ) {}

  ngOnInit(): void {
    const categories = this.route.snapshot.data.categories;
    this.categoryCards = categories.map((category: Category) => {
      return { title: category.name, description: category.description };
    });
    // To Do: bind to an store
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
    this.featuredCards$ = of([
      { title: 'Angular Material', description: 'Material Design for Angular' },
      { title: 'NgRx', description: 'Redux implementation' },
      { title: 'Nx.dev', description: 'CLI supercharged' },
    ]);
  }
  searchResources(searchText: string) {
    // To Do: dispatch action
    this.searchText = searchText;
  }
}
