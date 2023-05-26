import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Theme } from './models/theme.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GW-SHARE';
  currentRoute: string = '';

  themes: Theme[] = [];
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  showSidebarAndHeader(): boolean {
    return this.currentRoute !== '/not-found' && this.currentRoute !== '/login';
  }
}
