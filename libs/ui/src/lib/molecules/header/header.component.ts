import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Link } from '../../models/Link';

@Component({
  selector: 'ab-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() appHeading!: string;
  @Input() headerLinks!: Link[];
}
