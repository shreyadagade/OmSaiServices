import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'oss-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})

export class Header {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}