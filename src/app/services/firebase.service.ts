import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import { Messaging } from '@nativescript/firebase-messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';

export interface NotificationData {
  title: string;
  body: string;
  timestamp: string;
  receivedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private fcmToken: string = '';
  private notificationsSubject = new BehaviorSubject<NotificationData[]>([]);
  public notifications$: Observable<NotificationData[]> = this.notificationsSubject.asObservable();
  private messagingInstance: Messaging;

  constructor() {
    this.messagingInstance = firebase().messaging();
  }

  /**
   * Inicializa Firebase y solicita permisos
   */
  async initializeFirebase(): Promise<void> {
    try {
      // Inicializar Firebase
      await firebase().initializeApp();
      console.log('✅ Firebase inicializado correctamente');

      // Solicitar permisos de notificaciones
      const hasPermission = await this.requestPermissions();
      
      if (hasPermission) {
        // Obtener token FCM
        await this.getFCMToken();
        
        // Configurar listeners de notificaciones
        this.setupNotificationListeners();
      }
    } catch (error) {
      console.error('❌ Error al inicializar Firebase:', error);
    }
  }

  /**
   * Solicita permisos para notificaciones
   */
  private async requestPermissions(): Promise<boolean> {
    try {
      const authStatus = await this.messagingInstance.requestPermission();
      const hasPermission = authStatus === 1 || authStatus === 2; // AUTHORIZED (1) o PROVISIONAL (2)
      console.log('Permisos de notificación:', hasPermission ? 'Otorgados' : 'Denegados');
      return hasPermission;
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      return false;
    }
  }

  /**
   * Obtiene el token FCM del dispositivo
   */
  private async getFCMToken(): Promise<void> {
    try {
      this.fcmToken = await this.messagingInstance.getToken();
      console.log('🔑 Token FCM obtenido:', this.fcmToken);
      
      // Mostrar token en toast
      new Toasty({
        text: `✅ Token FCM: ${this.fcmToken.substring(0, 20)}...`,
        duration: ToastDuration.LONG
      }).show();
    } catch (error) {
      console.error('Error al obtener token FCM:', error);
    }
  }

  /**
   * Configura listeners para notificaciones entrantes
   */
  private setupNotificationListeners(): void {
    // Listener para notificaciones cuando la app está en foreground
    this.messagingInstance.onMessage((message) => {
      console.log('📩 Notificación recibida (foreground):', message);
      this.handleNotification(message);
    });

    // Listener para notificaciones cuando la app está en background
    this.messagingInstance.onNotificationTap((message) => {
      console.log('📩 Notificación tapped (background):', message);
      this.handleNotification(message);
    });
  }

  /**
   * Maneja notificaciones entrantes
   */
  private handleNotification(message: any): void {
    const now = new Date();
    const notification: NotificationData = {
      title: message.title || message.notification?.title || 'Notificación',
      body: message.body || message.notification?.body || 'Nueva notificación recibida',
      timestamp: now.toISOString(),
      receivedAt: now.toLocaleString()
    };

    // Agregar a la lista de notificaciones
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([notification, ...currentNotifications]);

    // Requisito: Toast que muestre las notificaciones entrantes
    new Toasty({
      text: `📬 ${notification.title}: ${notification.body}`,
      duration: ToastDuration.LONG
    }).show();
  }

  /**
   * Obtiene el token FCM actual
   */
  getToken(): string {
    return this.fcmToken;
  }

  /**
   * Obtiene todas las notificaciones recibidas
   */
  getNotifications(): NotificationData[] {
    return this.notificationsSubject.getValue();
  }

  /**
   * Limpia todas las notificaciones
   */
  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }

  /**
   * Suscribirse a un topic
   */
  async subscribeToTopic(topic: string): Promise<void> {
    try {
      await this.messagingInstance.subscribeToTopic(topic);
      console.log(`✅ Suscrito al topic: ${topic}`);
      
      new Toasty({
        text: `✅ Suscrito a ${topic}`,
        duration: ToastDuration.SHORT
      }).show();
    } catch (error) {
      console.error('Error al suscribirse al topic:', error);
    }
  }

  /**
   * Desuscribirse de un topic
   */
  async unsubscribeFromTopic(topic: string): Promise<void> {
    try {
      await this.messagingInstance.unsubscribeFromTopic(topic);
      console.log(`✅ Desuscrito del topic: ${topic}`);
      
      new Toasty({
        text: `✅ Desuscrito de ${topic}`,
        duration: ToastDuration.SHORT
      }).show();
    } catch (error) {
      console.error('Error al desuscribirse del topic:', error);
    }
  }
}
