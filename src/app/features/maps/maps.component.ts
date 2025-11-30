import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { registerElement } from '@nativescript/angular';
import * as geolocation from '@nativescript/geolocation';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';

// Registrar el elemento MapView
registerElement('MapView', () => MapView);

@Component({
  selector: 'Maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild('mapView', { static: false }) mapViewRef!: ElementRef;
  
  mapView: MapView | null = null;
  latitude: number = 14.0818; // Tegucigalpa, Honduras (CEUTEC)
  longitude: number = -87.2068;
  zoom: number = 15;
  markers: Marker[] = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.checkLocationPermission();
  }

  /**
   * Verifica y solicita permisos de ubicación
   */
  async checkLocationPermission(): Promise<void> {
    try {
      await geolocation.enableLocationRequest();
      console.log('✅ Permisos de ubicación otorgados');
      await this.getCurrentLocation();
    } catch (error) {
      console.error('Error al verificar permisos de ubicación:', error);
    }
  }

  /**
   * Obtiene la ubicación actual del dispositivo
   */
  async getCurrentLocation(): Promise<void> {
    try {
      const location = await geolocation.getCurrentLocation({
        desiredAccuracy: 3, // high accuracy (CoreLocation.kCLLocationAccuracyBest)
        maximumAge: 5000,
        timeout: 20000
      });

      if (location) {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        console.log('📍 Ubicación actual:', this.latitude, this.longitude);
        
        new Toasty({
          text: '📍 Ubicación obtenida',
          duration: ToastDuration.SHORT
        }).show();
      }
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      new Toasty({
        text: '⚠️ No se pudo obtener la ubicación',
        duration: ToastDuration.SHORT
      }).show();
    }
  }

  /**
   * Evento cuando el mapa está listo
   */
  onMapReady(args: any): void {
    this.mapView = args.object;
    console.log('✅ Mapa de Google listo');

    // Requisito: Marker en el mapa
    this.addDefaultMarker();
    
    new Toasty({
      text: '🗺️ Mapa de Google Maps cargado',
      duration: ToastDuration.SHORT
    }).show();
  }

  /**
   * Requisito: Agregar un marker en el mapa
   */
  addDefaultMarker(): void {
    if (!this.mapView) return;

    const marker = new Marker();
    marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
    marker.title = 'CEUTEC';
    marker.snippet = 'Universidad Tecnológica Centroamericana';
    marker.color = 'red';
    marker.userData = { id: 1, name: 'CEUTEC' };

    this.mapView.addMarker(marker);
    this.markers.push(marker);

    console.log('📍 Marker agregado:', marker.title);
  }

  /**
   * Agregar marker en ubicación actual
   */
  async onAddMarkerAtCurrentLocation(): Promise<void> {
    try {
      const location = await geolocation.getCurrentLocation({
        desiredAccuracy: 3, // high accuracy
        maximumAge: 5000,
        timeout: 20000
      });

      if (location && this.mapView) {
        const marker = new Marker();
        marker.position = Position.positionFromLatLng(location.latitude, location.longitude);
        marker.title = 'Mi Ubicación';
        marker.snippet = `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
        marker.color = 'blue';

        this.mapView.addMarker(marker);
        this.markers.push(marker);

        // Centrar mapa en la nueva ubicación
        this.mapView.latitude = location.latitude;
        this.mapView.longitude = location.longitude;

        new Toasty({
          text: '📍 Marker agregado en tu ubicación',
          duration: ToastDuration.SHORT
        }).show();
      }
    } catch (error) {
      console.error('Error al agregar marker:', error);
      new Toasty({
        text: '❌ Error al agregar marker',
        duration: ToastDuration.SHORT
      }).show();
    }
  }

  /**
   * Agregar marker personalizado
   */
  onAddCustomMarker(): void {
    if (!this.mapView) return;

    // Agregar marker cerca de la ubicación actual
    const offsetLat = (Math.random() - 0.5) * 0.01;
    const offsetLng = (Math.random() - 0.5) * 0.01;

    const marker = new Marker();
    marker.position = Position.positionFromLatLng(
      this.latitude + offsetLat,
      this.longitude + offsetLng
    );
    marker.title = `Punto ${this.markers.length + 1}`;
    marker.snippet = 'Marker personalizado';
    marker.color = 'green';

    this.mapView.addMarker(marker);
    this.markers.push(marker);

    new Toasty({
      text: `📍 Marker #${this.markers.length} agregado`,
      duration: ToastDuration.SHORT
    }).show();
  }

  /**
   * Limpiar todos los markers
   */
  onClearMarkers(): void {
    if (!this.mapView) return;

    this.mapView.removeAllMarkers();
    this.markers = [];

    new Toasty({
      text: '🗑️ Todos los markers eliminados',
      duration: ToastDuration.SHORT
    }).show();
  }

  /**
   * Centrar mapa en ubicación actual
   */
  async onCenterMap(): Promise<void> {
    if (!this.mapView) return;

    try {
      const location = await geolocation.getCurrentLocation({
        desiredAccuracy: 3, // high accuracy
        maximumAge: 5000,
        timeout: 20000
      });

      if (location) {
        this.mapView.latitude = location.latitude;
        this.mapView.longitude = location.longitude;
        this.mapView.zoom = 15;

        new Toasty({
          text: '📍 Mapa centrado en tu ubicación',
          duration: ToastDuration.SHORT
        }).show();
      }
    } catch (error) {
      console.error('Error al centrar mapa:', error);
    }
  }

  /**
   * Evento cuando se toca un marker
   */
  onMarkerSelect(args: any): void {
    const marker = args.marker;
    console.log('Marker seleccionado:', marker.title);
    
    new Toasty({
      text: `📍 ${marker.title}: ${marker.snippet}`,
      duration: ToastDuration.SHORT
    }).show();
  }

  /**
   * Evento cuando se toca el mapa
   */
  onCoordinateTapped(args: any): void {
    console.log('Coordenadas tocadas:', args.position);
  }
}
