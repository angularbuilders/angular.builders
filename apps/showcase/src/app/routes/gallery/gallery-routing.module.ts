import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { CategoriesResolver } from './services/categories.resolver';
import { ItemsResolver } from './services/items.resolver';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    resolve: {
      categories: CategoriesResolver,
      resources: ItemsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
