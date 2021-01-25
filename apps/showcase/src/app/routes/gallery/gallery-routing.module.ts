import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { CategoriesResolver } from './services/categories.resolver';
import { ResourcesResolver } from './services/resources.resolver';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    resolve: {
      categories: CategoriesResolver,
      resources: ResourcesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
