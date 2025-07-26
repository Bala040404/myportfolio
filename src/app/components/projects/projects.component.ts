import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger, style, transition, animate, query, stagger
} from '@angular/animations';

interface Project {
  id: number;
  name: string;
  githubLink: string;
  description?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px) scale(0.9)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('100ms', [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      id: 1,
      name: 'EEG Signals Car',
      githubLink: 'https://github.com/Bala040404/eegcar',
      description: 'A car that can be controlled using brain signals.'
    },
    {
      id: 2,
      name: 'Rescue Agency tracker',
      githubLink: 'https://github.com/Bala040404/rescue-relief-agencies',
      description: 'An application for registering and mapping locations of rescue agencies during disasters, providing real-time updates and coordination features.'
    },
    {
      id: 3,
      name: 'Pharmacy Management System',
      githubLink: 'https://github.com/Bala040404/pharmacy-mangaement',
      description: 'A comprehensive system for managing pharmacy operations, including inventory, sales, and customer management.'
    },
    {
      id: 4,
      name: 'Heritage sites Monitoring',
      githubLink: 'https://github.com/Bala040404/Damage_detection_walls',
      description: 'A system for monitoring and preserving heritage sites using advanced imaging techniques.'
    },
    {
      id: 5,
      name: 'Social Media Clone',
      githubLink: 'https://github.com/Bala040404/twitterClone',
      description: 'A social media platform with  user profiles, and media sharing.'
    },
    {
      id: 6,
      name: 'E-commerce Dashboard',
      githubLink: 'https://github.com/Bala040404/e-commercesdashboard',
      description: 'Robust e-commerce dashboard with user management features.'
    }
  ];

  ngOnInit(): void {}

  trackByProject(index: number, project: Project): number {
    return project.id;
  }

  onCardHover(event: MouseEvent, isEntering: boolean): void {
    const card = event.currentTarget as HTMLElement;
    card.style.zIndex = isEntering ? '10' : '1';
  }
}
