import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private readonly USERNAME_KEY = 'USER_NAME';
  private readonly DEFAULT_USERNAME = 'Usuario';

  private usernameSubject = new BehaviorSubject<string>(this.DEFAULT_USERNAME);
  public username$: Observable<string> = this.usernameSubject.asObservable();

  constructor() {
    this.loadUsername();
  }

  /**
   * Carga el nombre de usuario desde ApplicationSettings
   */
  private loadUsername(): void {
    const username = ApplicationSettings.getString(this.USERNAME_KEY, this.DEFAULT_USERNAME);
    this.usernameSubject.next(username);
  }

  /**
   * Obtiene el nombre de usuario actual
   */
  getUsername(): string {
    return this.usernameSubject.getValue();
  }

  /**
   * Guarda el nombre de usuario con persistencia
   */
  setUsername(username: string): void {
    if (!username || username.trim().length === 0) {
      console.error('El nombre de usuario no puede estar vacío');
      return;
    }

    const trimmedUsername = username.trim();
    ApplicationSettings.setString(this.USERNAME_KEY, trimmedUsername);
    this.usernameSubject.next(trimmedUsername);
  }

  /**
   * Resetea el nombre de usuario al valor por defecto
   */
  resetUsername(): void {
    ApplicationSettings.remove(this.USERNAME_KEY);
    this.usernameSubject.next(this.DEFAULT_USERNAME);
  }
}
