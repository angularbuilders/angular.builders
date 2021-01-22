import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CategoriesResolver } from './services/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      categories: CategoriesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
