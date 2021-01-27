import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ab-showcase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Angular.Builders showcase';
}
