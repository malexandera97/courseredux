import { Component, OnInit } from '@angular/core';
import { FavoritesService, Favorite } from '../../services/favorites.service';
import { RouterExtensions } from '@nativescript/angular';
import { Store } from '@ngrx/store';
import { addReadNowItem, ReadNowItem } from '../../store/actions/read-now.actions';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private routerExtensions: RouterExtensions,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    
    // Suscribirse a cambios en favoritos
    this.favoritesService.favorites$.subscribe(
      (favs) => {
        this.favorites = favs;
      }
    );
  }

  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  // Navegar al detalle del favorito
  onItemTap(favorite: Favorite): void {
    this.routerExtensions.navigate(['/products/detail', favorite.id], {
      transition: {
        name: 'slide'
      }
    });
  }

  // Requisito: Botón "Leer ahora" que despacha action al store de Redux
  onReadNow(favorite: Favorite): void {
    const readNowItem: ReadNowItem = {
      id: favorite.id,
      name: favorite.name,
      description: favorite.description,
      price: favorite.price,
      category: favorite.category,
      readAt: new Date().toISOString()
    };

    // Despachar acción al Redux Store
    this.store.dispatch(addReadNowItem({ item: readNowItem }));

    new Toasty({
      text: `📖 "${favorite.name}" agregado a Leer Ahora`
    }).show();
  }

  // Remover de favoritos
  onRemoveFavorite(favorite: Favorite): void {
    this.favoritesService.removeFavorite(favorite.id);
    
    new Toasty({
      text: `❌ "${favorite.name}" removido de favoritos`
    }).show();
  }

  // Limpiar todos los favoritos
  onClearAll(): void {
    if (this.favorites.length === 0) {
      new Toasty({
        text: '⚠️ No hay favoritos para limpiar'
      }).show();
      return;
    }

    this.favoritesService.clearFavorites();
    
    new Toasty({
      text: '✅ Todos los favoritos han sido eliminados'
    }).show();
  }
}
