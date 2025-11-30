import { Component, OnInit } from '@angular/core';
import * as camera from '@nativescript/camera';
import { ImageAsset, ImageSource } from '@nativescript/core';
import { shareImage, shareText, shareUrl } from '@nativescript/social-share';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  capturedImage: ImageAsset | null = null;
  imageSource: any = null;
  hasCameraPermission: boolean = false;

  // Texto de ejemplo para compartir
  shareTextContent: string = '¡Hola! Estoy usando CourseRedux, una app increíble de NativeScript + Angular con Firebase, Redux y muchas características más! 🚀';

  constructor() {}

  async ngOnInit(): Promise<void> {
    // Verificar permisos de cámara
    await this.checkCameraPermission();
  }

  /**
   * Verifica y solicita permisos de cámara
   */
  async checkCameraPermission(): Promise<void> {
    try {
      const permissionsResult = await camera.requestPermissions();
      this.hasCameraPermission = !!permissionsResult;
      
      if (this.hasCameraPermission) {
        console.log('✅ Permisos de cámara otorgados');
      } else {
        console.log('⚠️ Permisos de cámara denegados');
        new Toasty({
          text: '⚠️ Se requieren permisos de cámara',
          duration: ToastDuration.LONG
        }).show();
      }
    } catch (error) {
      console.error('Error al verificar permisos:', error);
    }
  }

  /**
   * Requisito: Plugin camera para tomar fotografías
   */
  async onTakePhoto(): Promise<void> {
    if (!this.hasCameraPermission) {
      await this.checkCameraPermission();
      return;
    }

    try {
      const imageAsset = await camera.takePicture({
        width: 1024,
        height: 1024,
        keepAspectRatio: true,
        saveToGallery: true
      });

      if (imageAsset) {
        this.capturedImage = imageAsset;
        console.log('✅ Foto capturada exitosamente');
        
        new Toasty({
          text: '📸 Foto capturada exitosamente',
          duration: ToastDuration.SHORT
        }).show();
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      new Toasty({
        text: '❌ Error al tomar foto',
        duration: ToastDuration.SHORT
      }).show();
    }
  }

  /**
   * Requisito: Social-share para compartir texto
   */
  onShareText(): void {
    try {
      shareText(this.shareTextContent, 'Compartir texto desde CourseRedux');
      
      new Toasty({
        text: '📤 Compartiendo texto...',
        duration: ToastDuration.SHORT
      }).show();
    } catch (error) {
      console.error('Error al compartir texto:', error);
      new Toasty({
        text: '❌ Error al compartir texto',
        duration: ToastDuration.SHORT
      }).show();
    }
  }

  /**
   * Requisito: Social-share para compartir imagen (predefinida)
   */
  async onShareSampleImage(): Promise<void> {
    try {
      // Crear una imagen de ejemplo desde recursos
      const imagePath = '~/App_Resources/Android/src/main/res/drawable-hdpi/icon.png';
      const imageSource = ImageSource.fromFileOrResourceSync(imagePath);
      
      if (imageSource) {
        await shareImage(imageSource, 'Compartir imagen desde CourseRedux');
        
        new Toasty({
          text: '✅ Imagen compartida',
          duration: ToastDuration.SHORT
        }).show();
      }
    } catch (error) {
      console.error('Error al compartir imagen:', error);
      new Toasty({
        text: '❌ Error al compartir imagen',
        duration: ToastDuration.SHORT
      }).show();
    }
  }

  /**
   * Requisito: Imagen de cámara compartida por social-share
   */
  async onShareCapturedPhoto(): Promise<void> {
    if (!this.capturedImage) {
      new Toasty({
        text: '⚠️ Primero toma una foto',
        duration: ToastDuration.SHORT
      }).show();
      return;
    }

    try {
      // Convertir ImageAsset a ImageSource
      const imageSource = await ImageSource.fromAsset(this.capturedImage);
      
      // Compartir la imagen capturada
      await shareImage(imageSource, 'Compartir foto desde CourseRedux');
      
      new Toasty({
        text: '✅ Foto compartida',
        duration: ToastDuration.SHORT
      }).show();
    } catch (error) {
      console.error('Error al compartir foto:', error);
      new Toasty({
        text: '❌ Error al compartir foto',
        duration: ToastDuration.SHORT
      }).show();
    }
  }

  /**
   * Compartir URL
   */
  onShareUrl(): void {
    try {
      shareUrl(
        'https://github.com/malexandera97/courseredux',
        'Mira este proyecto increíble',
        'Compartir proyecto'
      );
      
      new Toasty({
        text: '📤 Compartiendo URL...',
        duration: ToastDuration.SHORT
      }).show();
    } catch (error) {
      console.error('Error al compartir URL:', error);
    }
  }

  /**
   * Eliminar foto capturada
   */
  onClearPhoto(): void {
    this.capturedImage = null;
    
    new Toasty({
      text: '🗑️ Foto eliminada',
      duration: ToastDuration.SHORT
    }).show();
  }
}
