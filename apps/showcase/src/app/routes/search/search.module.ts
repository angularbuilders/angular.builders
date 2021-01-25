import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchGalleryResourcesComponent } from './search-gallery-resources/search-gallery-resources.component';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchHeaderComponent,
    SearchGalleryResourcesComponent,
  ],
  imports: [CommonModule, SearchRoutingModule, FormsModule],
})
export class SearchModule {}
