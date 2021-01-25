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
    path: '',
    loadChildren: () =>
      import('../routes/home/home.module').then((m) => m.HomeModule),
    data: {
      pageTitle: 'Gallery',
      pageDescription: 'The gallery of resources for Angular developers',
      hideHeader: true,
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
      console.log(routerEvent);
      if (routerEvent instanceof NavigationEnd) {
        console.warn('Do something with new URL ' + routerEvent.url);
        const routeData = this.activatedRoute.firstChild?.snapshot.data;
        if (routeData) {
          this.headService.setTitle(routeData.pageTitle || '');
          this.headService.setDescription(routeData.pageDescription || '');
        }
        // ToDo: send signal to show or hide header/footer
      }
    });
  }
}
