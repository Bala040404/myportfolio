import { Component } from '@angular/core';
import { TechnicalSkillsComponent } from "../technical-skills/technical-skills.component";
import { LanguagesKnownComponent } from "../languages-known/languages-known.component";

@Component({
  selector: 'app-skills',
  imports: [TechnicalSkillsComponent, LanguagesKnownComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
