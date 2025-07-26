import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

interface Achievement {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  position: { x: number; y: number };
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  imports: [DecimalPipe, CommonModule],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(40px) scale(0.95)', opacity: 0 }),
        animate('500ms cubic-bezier(.68,-0.55,.27,1.55)', style({ transform: 'translateY(0) scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('350ms cubic-bezier(.68,-0.55,.27,1.55)', style({ transform: 'translateY(40px) scale(0.95)', opacity: 0 }))
      ])
    ])
  ]
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  @ViewChild('plane', { static: false }) plane!: ElementRef;
  @ViewChild('track', { static: false }) track!: ElementRef;

  trackByAchievement(index: number, achievement: any): any {
    return achievement.id;
  }

  achievements: Achievement[] = [
    {
      id: 1,
      title: 'School ',
      subtitle: 'Nag Vidhyashram sr sec school',
      description: 'Excelled in academics and science fairs, building the foundation for my tech journey.',
      icon: 'school_advanced.svg',
      color: '#6dd5ed',
      bg: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
      position: { x: 15, y: 60 }
    },
    {
      id: 2,
      title: 'College ',
      subtitle: 'B.Tech in IT ,SSN College of Engineering ',
      description: 'Graduated with honors, led coding clubs, and built award-winning web projects.',
      icon: 'college_advanced.svg',
      color: '#f7971e',
      bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      position: { x: 45, y: 40 }
    },
    {
      id: 3,
      title: 'Summer Intern',
      subtitle: 'Fidelity Investments',
      description: 'Developed an application to automate technological lifecycle managment in Angular & springboot',
      icon: '2monthintern.svg',
      color: '#a259f7',
      bg: 'linear-gradient(135deg, #a259f7 0%, #6a5af9 100%)',
      position: { x: 70, y: 80 }
    },
    {
      id: 4,
      title: '💼 Full Stack intern',
      subtitle: 'Fidelity INvestments',
      description: 'Moderenised .net applications to angular and mentored juniors.',
      icon: '5monthintern.svg',
      color: '#43e97b',
      bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      position: { x: 85, y: 40 }
    }
  ];

  currentAchievement: Achievement | null = null;
  isDragging = false;
  planePosition = { x: 5, y: 60 };

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupDragFunctionality();
  }

  setupDragFunctionality(): void {
    const plane = this.plane.nativeElement;
    const track = this.track.nativeElement;

    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      this.isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = this.planePosition.x;
      initialY = this.planePosition.y;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      plane.classList.add('dragging');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;
      e.preventDefault();

      const rect = track.getBoundingClientRect();
      const deltaX = ((e.clientX - startX) / rect.width) * 100;
      const deltaY = ((e.clientY - startY) / rect.height) * 100;

      this.planePosition.x = Math.max(2, Math.min(98, initialX + deltaX));
      this.planePosition.y = Math.max(2, Math.min(98, initialY + deltaY));

      this.updatePlanePosition();
      this.checkForHoops();
    };

    const onMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      this.isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      plane.classList.remove('dragging');
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      this.isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      initialX = this.planePosition.x;
      initialY = this.planePosition.y;

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);

      plane.classList.add('dragging');
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!this.isDragging) return;
      e.preventDefault();

      const touch = e.touches[0];
      const rect = track.getBoundingClientRect();
      const deltaX = ((touch.clientX - startX) / rect.width) * 100;
      const deltaY = ((touch.clientY - startY) / rect.height) * 100;

      this.planePosition.x = Math.max(2, Math.min(98, initialX + deltaX));
      this.planePosition.y = Math.max(2, Math.min(98, initialY + deltaY));

      this.updatePlanePosition();
      this.checkForHoops();
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      this.isDragging = false;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);

      plane.classList.remove('dragging');
    };

    // Add both mouse and touch event listeners
    plane.addEventListener('mousedown', onMouseDown);
    plane.addEventListener('touchstart', onTouchStart, { passive: false });

    // Prevent context menu on right click
    plane.addEventListener('contextmenu', (e: MouseEvent) => e.preventDefault());
  }

  updatePlanePosition(): void {
    const plane = this.plane.nativeElement;
    plane.style.left = `${this.planePosition.x}%`;
    plane.style.top = `${this.planePosition.y}%`;
  }

  checkForHoops(): void {
    const threshold = 8; // Distance threshold for triggering achievement

    for (const achievement of this.achievements) {
      const distance = Math.sqrt(
        Math.pow(this.planePosition.x - achievement.position.x, 2) +
        Math.pow(this.planePosition.y - achievement.position.y, 2)
      );

      if (distance < threshold) {
        this.showAchievement(achievement);
        break;
      }
    }
  }

  showAchievement(achievement: Achievement): void {
    if (this.currentAchievement?.id === achievement.id) return;

    this.currentAchievement = achievement;

    // Hide achievement after 4 seconds
    setTimeout(() => {
      if (this.currentAchievement?.id === achievement.id) {
        this.currentAchievement = null;
      }
    }, 4000);
  }

  closeAchievement(): void {
    this.currentAchievement = null;
  }
}