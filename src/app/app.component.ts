import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutMeCardComponent } from "./components/about-me-card/about-me-card.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ContactLinksCardComponent } from "./components/contact-links-card/contact-links-card.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { HomeComponent } from "./components/home/home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, AboutMeCardComponent, NavbarComponent, ContactLinksCardComponent, SkillsComponent, ExperienceComponent, HomeComponent, ProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'portfolio';
}
