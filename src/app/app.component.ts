import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit(): Promise<void> {
    // Inicializar Firebase al arrancar la app
    await this.firebaseService.initializeFirebase();
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
