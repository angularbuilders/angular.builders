import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'ab-showcase-event-sub-form',
  templateUrl: './event-sub-form.component.html',
  styleUrls: ['./event-sub-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSubFormComponent {
  subForm = this.controlContainer.control as FormGroup;
  constructor(public controlContainer: ControlContainer) {}
}
