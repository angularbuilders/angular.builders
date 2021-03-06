import { AuthenticatedGuard } from '@angular.builders/auth';
import { HeadService } from '@angular.builders/ui';
import { NgModule } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../routes/gallery/gallery.module').then((m) => m.GalleryModule),
    data: {
      pageTitle: 'Gallery',
      pageDescription: 'The gallery of resources for Angular developers',
    },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@angular.builders/auth').then((module) => module.AuthModule),
    data: {
      pageTitle: 'Authorization',
      pageDescription: 'Autentication and authorization pages',
      hideHeader: true,
    },
  },
  {
    path: 'search',
    loadChildren: () =>
      import('../routes/search/search.module').then((m) => m.SearchModule),
    data: {
      pageTitle: 'Search results',
      pageDescription:
        'Search results for resources on Angular Builders showcase database',
    },
  },

  {
    path: 'items/new',
    canActivate: [AuthenticatedGuard],
    canActivateChild: [AuthenticatedGuard],
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('../routes/items/new/new.module').then((m) => m.NewModule),
    data: {
      pageTitle: 'GUARDED !!! Add a new resource',
      pageDescription: 'Add a new resource for Angular developers',
    },
  },
  {
    path: 'items/:id',
    loadChildren: () =>
      import('../routes/items/show/show.module').then((m) => m.ShowModule),
    data: {
      pageTitle: 'Gallery',
      pageDescription: 'Show details of the items',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private headService: HeadService
  ) {
    this.router.events.subscribe((routerEvent) => {
      // console.log(routerEvent);
      if (routerEvent instanceof NavigationEnd) {
        const routeData = this.activatedRoute.firstChild?.snapshot.data;
        if (routeData) {
          this.headService.setTitle(routeData.pageTitle || '');
          this.headService.setDescription(routeData.pageDescription || '');
        }
        // ToDo: send signal to show or hide header/footer
        //console.warn('Do something with new URL ' + routerEvent.url);
      }
    });
  }
}
