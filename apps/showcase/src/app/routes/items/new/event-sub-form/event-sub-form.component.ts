import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ab-showcase-event-sub-form',
  templateUrl: './event-sub-form.component.html',
  styleUrls: ['./event-sub-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSubFormComponent {
  constructor(public controlContainer: ControlContainer) {}
}
