import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ab-showcase-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  appHeading = 'Angular.Builders';
  headerLinks = [{ url: '/', text: '🏠 Home' }];
  developerText = 'Alberto Basalo';
  developerUrl = 'https://twitter.com/albertobasalo';
}