import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  headerLinks = [
    { link: ['/home'], icon: 'home' },
    { link: ['/settings'], icon: 'cog' }
  ];

  subLinks = [
    { link: ['/play'], label: 'Play' },
    { link: ['/instructions'], label: 'Instructions' },
    { link: ['/ranking'], label: 'Ranking' }
  ];

  constructor() {}
}
