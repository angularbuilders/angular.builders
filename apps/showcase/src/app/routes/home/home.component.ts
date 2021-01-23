import { Card } from '@angular.builders/ui';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourcesService } from '../../core/services/resources.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchText = '';
  categoryCards!: Card[];
  featuredCards!: Card[];

  constructor(
    private route: ActivatedRoute,
    private resource: ResourcesService
  ) {}

  ngOnInit(): void {
    this.categoryCards = this.route.snapshot.data.categories;
    this.featuredCards = this.route.snapshot.data.resources;
  }
  searchResources(searchText: string) {
    this.searchText = searchText;
    console.log('ToDo: dispatch action ' + this.searchText);
  }
}
