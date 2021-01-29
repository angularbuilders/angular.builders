import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'ab-showcase-course-sub-form',
  templateUrl: './course-sub-form.component.html',
  styleUrls: ['./course-sub-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseSubFormComponent {
  subForm = this.controlContainer.control as FormGroup;
  constructor(public controlContainer: ControlContainer) {}
}
