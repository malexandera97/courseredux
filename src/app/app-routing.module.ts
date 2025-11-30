import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('~/app/features/home/home.module').then(m => m.HomeModule) },
  { path: 'browse', loadChildren: () => import('~/app/features/browse/browse.module').then(m => m.BrowseModule) },
  { path: 'search', loadChildren: () => import('~/app/features/search/search.module').then(m => m.SearchModule) },
  { path: 'products', loadChildren: () => import('~/app/features/products/products.module').then(m => m.ProductsModule) },
  { path: 'favorites', loadChildren: () => import('~/app/features/favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: 'settings', loadChildren: () => import('~/app/features/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'camera', loadChildren: () => import('~/app/features/camera/camera.module').then(m => m.CameraModule) },
  { path: 'maps', loadChildren: () => import('~/app/features/maps/maps.module').then(m => m.MapsModule) }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
