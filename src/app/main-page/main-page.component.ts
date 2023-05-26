import { Component } from '@angular/core';
import { Theme } from '../models/theme.model';

import { MainPageService } from './services/main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  themes: Theme[] = [];

  constructor(private mainPageService: MainPageService) {}

  ngOnInit() {
    this.getThemes();
  }

  getThemes () {
    this.mainPageService.getThemes().subscribe({
      next: (data) => {
        this.themes = data;
      }
    })
  }
} 
