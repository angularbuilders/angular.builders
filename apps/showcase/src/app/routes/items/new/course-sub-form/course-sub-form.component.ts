import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ab-showcase-course-sub-form',
  templateUrl: './course-sub-form.component.html',
  styleUrls: ['./course-sub-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseSubFormComponent {
  constructor(public controlContainer: ControlContainer) {}
}
