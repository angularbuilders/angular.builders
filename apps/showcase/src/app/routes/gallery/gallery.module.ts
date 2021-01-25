import { DataModule } from '@angular.builders/data';
import { UiModule } from '@angular.builders/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleryCategoriesComponent } from './gallery-categories/gallery-categories.component';
import { GalleryFeaturedComponent } from './gallery-featured/gallery-featured.component';
import { GalleryHeaderComponent } from './gallery-header/gallery-header.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryHeaderComponent,
    GalleryCategoriesComponent,
    GalleryFeaturedComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    UiModule,
    DataModule,
    FormsModule,
  ],
})
export class GalleryModule {}
