import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Link } from '../../models/Link';

@Component({
  selector: 'ab-ui-hyper-link',
  templateUrl: './hyper-link.component.html',
  styleUrls: ['./hyper-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HyperLinkComponent {
  @Input() link!: Link;
}
