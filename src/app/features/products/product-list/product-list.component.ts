import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isAndroid } from '@nativescript/core';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'ProductList',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  platformMessage: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Requisito 10: Código que asigna valor cuando está en Android
    if (isAndroid) {
      this.platformMessage = 'Estás usando Android';
    } else {
      this.platformMessage = 'Estás usando iOS';
    }

    this.products = this.productService.getProducts();
  }

  onProductTap(productId: number): void {
    this.router.navigate(['/products/detail', productId]);
  }
}
