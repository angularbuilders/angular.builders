import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HyperLinkComponent } from './atoms/hyper-link/hyper-link.component';
import { CardComponent } from './molecules/card/card.component';
import { FooterComponent } from './molecules/footer/footer.component';
import { HeaderComponent } from './molecules/header/header.component';
import { GalleryComponent } from './templates/gallery/gallery.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    HyperLinkComponent,
    CardComponent,
    GalleryComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HyperLinkComponent,
    CardComponent,
    GalleryComponent,
  ],
})
export class UiModule {}
