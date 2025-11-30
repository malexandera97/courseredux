import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { RouterExtensions } from '@nativescript/angular';
import { ObservableArray } from '@nativescript/core';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: ObservableArray<Product>;
  allProducts: Product[] = [];
  searchQuery: string = ''; // Two-way binding
  isRefreshing: boolean = false;

  constructor(
    private productService: ProductService,
    private routerExtensions: RouterExtensions
  ) {
    this.products = new ObservableArray<Product>([]);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.allProducts = this.productService.getProducts();
    this.products.push(...this.allProducts);
  }

  // Requisito: Two-way binding para búsqueda
  onSearchChange(): void {
    if (this.searchQuery.trim() === '') {
      this.products.splice(0, this.products.length);
      this.products.push(...this.allProducts);
    } else {
      const filtered = this.allProducts.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.products.splice(0, this.products.length);
      this.products.push(...filtered);
    }
  }

  // Requisito: Pull to refresh
  onPullToRefresh(args: any): void {
    const listView = args.object;
    this.isRefreshing = true;
    
    // Simular agregar productos aleatorios
    setTimeout(() => {
      const newProduct: Product = {
        id: this.allProducts.length + 1,
        name: `Producto Aleatorio ${Math.floor(Math.random() * 1000)}`,
        description: 'Producto agregado mediante pull to refresh',
        price: Math.floor(Math.random() * 1000) + 100,
        category: 'Nueva Categoría'
      };
      
      this.productService.addProduct(newProduct);
      this.loadProducts();
      this.onSearchChange();
      
      this.isRefreshing = false;
      listView.notifyPullToRefreshFinished();
    }, 1000);
  }

  // Requisito: Navegación a detalle con RouterExtensions
  onItemTap(args: any): void {
    const tappedProduct = this.products.getItem(args.index);
    this.routerExtensions.navigate(['/products/detail', tappedProduct.id], {
      transition: {
        name: 'slide'
      }
    });
  }
}
