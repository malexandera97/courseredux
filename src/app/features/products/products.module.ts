import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [NativeScriptCommonModule, ProductsRoutingModule],
  declarations: [ProductListComponent, ProductDetailComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductsModule {}
