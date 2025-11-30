import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Favorite {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  addedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly FAVORITES_KEY = 'USER_FAVORITES';
  private favoritesSubject = new BehaviorSubject<Favorite[]>([]);
  public favorites$: Observable<Favorite[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  /**
   * Carga los favoritos desde ApplicationSettings
   */
  private loadFavorites(): void {
    const favoritesJson = ApplicationSettings.getString(this.FAVORITES_KEY, '[]');
    try {
      const favorites = JSON.parse(favoritesJson);
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      this.favoritesSubject.next([]);
    }
  }

  /**
   * Guarda los favoritos en ApplicationSettings
   */
  private saveFavorites(favorites: Favorite[]): void {
    try {
      const favoritesJson = JSON.stringify(favorites);
      ApplicationSettings.setString(this.FAVORITES_KEY, favoritesJson);
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  }

  /**
   * Obtiene todos los favoritos
   */
  getFavorites(): Favorite[] {
    return this.favoritesSubject.getValue();
  }

  /**
   * Agrega un producto a favoritos
   */
  addFavorite(product: any): void {
    const favorites = this.getFavorites();
    
    // Verificar si ya existe
    if (favorites.some(f => f.id === product.id)) {
      console.log('El producto ya está en favoritos');
      return;
    }

    const newFavorite: Favorite = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      addedAt: new Date().toISOString()
    };

    favorites.push(newFavorite);
    this.saveFavorites(favorites);
  }

  /**
   * Elimina un producto de favoritos
   */
  removeFavorite(productId: number): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(f => f.id !== productId);
    this.saveFavorites(filtered);
  }

  /**
   * Verifica si un producto está en favoritos
   */
  isFavorite(productId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(f => f.id === productId);
  }

  /**
   * Alterna el estado de favorito
   */
  toggleFavorite(product: any): boolean {
    if (this.isFavorite(product.id)) {
      this.removeFavorite(product.id);
      return false;
    } else {
      this.addFavorite(product);
      return true;
    }
  }

  /**
   * Limpia todos los favoritos
   */
  clearFavorites(): void {
    this.saveFavorites([]);
  }
}
