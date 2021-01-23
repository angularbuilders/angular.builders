import { Card } from '@angular.builders/ui';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ResourcesService } from '../../core/services/resources.service';

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
    this.categoryCards = this.route.snapshot.data.categories;
    this.featuredCards$ = this.resource.getFeatured$();
  }
  searchResources(searchText: string) {
    this.searchText = searchText;
    console.log('ToDo: dispatch action ' + this.searchText);
  }
}
