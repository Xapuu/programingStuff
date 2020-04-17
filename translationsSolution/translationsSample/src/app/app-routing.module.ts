import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  loadChildren: () => import('./lazy-module/lazy-module.module').then(x => x.LazyModuleModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
