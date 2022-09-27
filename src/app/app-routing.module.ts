import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: 'partners', component: PartnersComponent },
];
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routingConfiguration)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}