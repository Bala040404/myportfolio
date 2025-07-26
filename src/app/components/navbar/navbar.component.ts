import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentSection = '';
  isMenuOpen = false; // New state variable for the hamburger menu

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;

      // Section is considered active if it's within the top 500px of viewport
      // and its bottom is below 200px (to prevent premature activation)
      if (sectionTop <= 500 && sectionTop + rect.height > 200) {
        current = section.getAttribute('id') || '';
      }
    });

    this.currentSection = current;
  }

  // New method to toggle the menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // New method to close menu when a link is clicked (useful for mobile)
  closeMenu() {
    this.isMenuOpen = false;
  }
}