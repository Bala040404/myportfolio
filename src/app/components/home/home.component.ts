import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cursor = { x: 0, y: 0 };

  onMouseMove(event: MouseEvent) {
    this.cursor.x = event.clientX;
    this.cursor.y = event.clientY;
  }
}
