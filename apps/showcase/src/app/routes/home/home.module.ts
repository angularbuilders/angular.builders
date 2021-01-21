import { DataModule } from '@angular.builders/data';
import { UiModule } from '@angular.builders/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleryCategoriesComponent } from './gallery-categories/gallery-categories.component';
import { GalleryFeaturedComponent } from './gallery-featured/gallery-featured.component';
import { GalleryHeaderComponent } from './gallery-header/gallery-header.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    GalleryHeaderComponent,
    GalleryCategoriesComponent,
    GalleryFeaturedComponent,
  ],
  imports: [CommonModule, FormsModule, HomeRoutingModule, UiModule, DataModule],
})
export class HomeModule {}
