import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavigationItem {
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'ns-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.css']
})
export class DrawerContentComponent {
  navigationItems: NavigationItem[] = [
    {
      title: 'Home',
      route: '/home',
      icon: 'res://home'
    },
    {
      title: 'Browse',
      route: '/browse',
      icon: 'res://browse'
    },
    {
      title: 'Search',
      route: '/search',
      icon: 'res://search'
    },
    {
      title: 'Productos',
      route: '/products',
      icon: 'res://shopping'
    }
  ];

  constructor(private router: Router) {}

  onNavigationItemTap(route: string): void {
    this.router.navigate([route]);
  }
}
