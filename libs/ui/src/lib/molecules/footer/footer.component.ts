import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Link } from '../../models/Link';

@Component({
  selector: 'ab-ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnChanges {
  @Input() developerText!: string;
  @Input() developerUrl!: string;
  link!: Link;
  year = new Date().getFullYear();

  ngOnChanges(): void {
    this.setLink();
  }

  private setLink() {
    this.link = {
      url: this.developerUrl,
      text: this.developerText,
      isRemote: true,
    };
  }
}
