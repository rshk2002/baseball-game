import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon, happyFaceIcon, cogIcon, homeIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon, happyFaceIcon, cogIcon, homeIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  headerLinks = [
    { link: '/home', icon: 'home' },
    { link: '/settings', icon: 'cog' },
  ];

  subLinks = [
    { link: '/play', label: 'Play' },
    { link: '/instructions', label: 'Instructions' },
    { link: '/ranking', label: 'Ranking' },
  ];

  constructor() {}
}
