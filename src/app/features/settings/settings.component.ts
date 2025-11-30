import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { FirebaseService, NotificationData } from '../../services/firebase.service';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // Requisito: Variable de configuración para URL de Ngrok
  ngrokUrl: string = '';
  
  // Requisito: Nombre de usuario persistente con AppSettings
  username: string = '';
  
  // Requisito: Token Firebase
  fcmToken: string = '';
  notifications: NotificationData[] = [];
  
  isConnected: boolean = false;
  isTesting: boolean = false;

  constructor(
    private apiService: ApiService,
    private userSettingsService: UserSettingsService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    // Cargar configuración actual
    this.ngrokUrl = this.apiService.getApiUrl();
    
    // Requisito: Leer nombre de usuario de manera persistente
    this.username = this.userSettingsService.getUsername();
    
    // Suscribirse a cambios en el username
    this.userSettingsService.username$.subscribe(
      (newUsername) => {
        this.username = newUsername;
      }
    );
    
    // Requisito: Token FCM de Firebase
    this.fcmToken = this.firebaseService.getToken();
    
    // Suscribirse a notificaciones
    this.firebaseService.notifications$.subscribe(
      (notifications) => {
        this.notifications = notifications;
      }
    );
  }
  
  // Copiar token al clipboard (simulado con toast)
  onCopyToken(): void {
    if (this.fcmToken) {
      new Toasty({
        text: `📋 Token: ${this.fcmToken}`,
        duration: ToastDuration.LONG
      }).show();
    } else {
      new Toasty({
        text: '⚠️ Token no disponible aún',
        duration: ToastDuration.SHORT
      }).show();
    }
  }
  
  // Limpiar notificaciones
  onClearNotifications(): void {
    this.firebaseService.clearNotifications();
    
    new Toasty({
      text: '🗑️ Notificaciones eliminadas',
      duration: ToastDuration.SHORT
    }).show();
  }

  // Requisito: Editar nombre de usuario y persistir con AppSettings
  onSaveUsername(): void {
    if (!this.username || this.username.trim().length === 0) {
      new Toasty({
        text: '⚠️ El nombre de usuario no puede estar vacío',
        duration: ToastDuration.SHORT
      }).show();
      return;
    }

    this.userSettingsService.setUsername(this.username);
    
    new Toasty({
      text: '✅ Nombre de usuario guardado',
      duration: ToastDuration.SHORT
    }).show();
  }

  onResetUsername(): void {
    this.userSettingsService.resetUsername();
    this.username = this.userSettingsService.getUsername();
    
    new Toasty({
      text: '✅ Nombre de usuario reseteado',
      duration: ToastDuration.SHORT
    }).show();
  }

  // Requisito: Configurar URL de Ngrok para conexión al API Express
  onSaveNgrokUrl(): void {
    if (!this.ngrokUrl || this.ngrokUrl.trim().length === 0) {
      new Toasty({
        text: '⚠️ La URL no puede estar vacía',
        duration: ToastDuration.SHORT
      }).show();
      return;
    }

    // Validar formato de URL
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(this.ngrokUrl)) {
      new Toasty({
        text: '⚠️ URL inválida. Debe empezar con http:// o https://',
        duration: ToastDuration.LONG
      }).show();
      return;
    }

    this.apiService.setApiUrl(this.ngrokUrl);
    
    new Toasty({
      text: '✅ URL del API configurada',
      duration: ToastDuration.SHORT
    }).show();
  }

  onResetNgrokUrl(): void {
    this.ngrokUrl = 'http://localhost:3000';
    this.apiService.setApiUrl(this.ngrokUrl);
    
    new Toasty({
      text: '✅ URL reseteada a localhost',
      duration: ToastDuration.SHORT
    }).show();
  }

  // Probar conexión con el API
  onTestConnection(): void {
    if (this.isTesting) return;
    
    this.isTesting = true;
    
    this.apiService.testConnection().subscribe(
      (success) => {
        this.isConnected = success;
        this.isTesting = false;
        
        if (success) {
          new Toasty({
            text: '✅ Conexión exitosa con el API',
            duration: ToastDuration.SHORT
          }).show();
        } else {
          new Toasty({
            text: '⚠️ No se pudo conectar al API',
            duration: ToastDuration.LONG
          }).show();
        }
      }
    );
  }
}
