import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../../core/models/Item';
import { ItemsService } from '../../../core/services/items.service';

@Component({
  selector: 'ab-showcase-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowComponent implements OnInit {
  item$!: Observable<Item>;

  constructor(private route: ActivatedRoute, private items: ItemsService) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.params['id'];
    this.item$ = this.items.getById$(itemId);
  }
}
