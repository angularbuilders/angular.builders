import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../../core/models/Resource';
import { ResourcesService } from '../../../core/services/resources.service';

@Component({
  selector: 'ab-showcase-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  item$!: Observable<Item[]>;

  constructor(private route: ActivatedRoute, private items: ResourcesService) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.params['id'];
    this.item$ = this.items.getById$(itemId);
  }
}
