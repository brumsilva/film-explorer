import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}

  goToLogin() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
}
