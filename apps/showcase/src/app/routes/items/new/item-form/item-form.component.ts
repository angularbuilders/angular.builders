import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../../../../core/models/Category';
import { Item } from '../../../../core/models/Item';

@Component({
  selector: 'ab-showcase-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFormComponent implements OnInit {
  @Input() categories!: Category[];
  @Output() save = new EventEmitter<Item>();
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      categoryId: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.minLength(3)]),
      url: new FormControl(''),
      event: new FormGroup({
        price: new FormControl(9),
      }),
    });
  }

  onSave() {
    const item = this.form.value as Item;
    this.save.next(item);
  }
}
