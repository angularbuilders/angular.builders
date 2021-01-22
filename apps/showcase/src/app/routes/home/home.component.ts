import { Card } from '@angular.builders/ui';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchText = '';
  categories$!: Observable<Card[]>;
  featured$!: Observable<Card[]>;

  ngOnInit(): void {
    // To Do: bind to an store
    this.categories$ = of([
      { title: 'UI', description: 'UI components' },
      { title: 'Data', description: 'Data libraries' },
      { title: 'Tools', description: 'Dev tools' },
    ]);
    this.featured$ = of([
      { title: 'Angular Material', description: 'Materila Design for Angular' },
      { title: 'NgRx', description: 'Redux implementation' },
      { title: 'Nx.dev', description: 'CLI supercharged' },
    ]);
  }
  searchResources(searchText: string) {
    // To Do: dispatch action
    this.searchText = searchText;
  }
}
