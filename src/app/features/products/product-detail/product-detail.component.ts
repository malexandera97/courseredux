import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { ProductService, Product } from '../../../services/product.service';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'ProductDetail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  editedName: string = '';
  editedPrice: number = 0;
  reviewText: string = ''; // Para validador
  userEmail: string = ''; // Para validador de email

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.product = this.productService.getProductById(id);
    
    if (this.product) {
      this.editedName = this.product.name;
      this.editedPrice = this.product.price;
    }
  }

  onBackTap(): void {
    this.routerExtensions.back();
  }

  // Requisito 7: Two-way binding para editar producto
  onSaveChanges(): void {
    if (this.product) {
      this.product.name = this.editedName;
      this.product.price = this.editedPrice;
      
      // Requisito 6: Toast
      const toast = new Toasty({
        text: '✓ Cambios guardados exitosamente',
        duration: 'short',
        position: 'bottom',
        textColor: '#ffffff',
        backgroundColor: '#27ae60'
      });
      toast.show();
    }
  }

  // Requisito 6: Toast al enviar reseña
  onSubmitReview(): void {
    if (this.reviewText.length >= 10 && this.userEmail.includes('@')) {
      const toast = new Toasty({
        text: '✓ Reseña enviada correctamente',
        duration: 'long',
        position: 'center'
      });
      toast.show();
      
      this.reviewText = '';
      this.userEmail = '';
    } else {
      const toast = new Toasty({
        text: '✗ Por favor completa todos los campos correctamente',
        duration: 'short',
        position: 'top',
        backgroundColor: '#e74c3c'
      });
      toast.show();
    }
  }
}
