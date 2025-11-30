import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('~/app/features/home/home.module').then(m => m.HomeModule) },
  { path: 'browse', loadChildren: () => import('~/app/features/browse/browse.module').then(m => m.BrowseModule) },
  { path: 'search', loadChildren: () => import('~/app/features/search/search.module').then(m => m.SearchModule) },
  { path: 'products', loadChildren: () => import('~/app/features/products/products.module').then(m => m.ProductsModule) }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
