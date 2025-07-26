import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesKnownComponent } from './languages-known.component';

describe('LanguagesKnownComponent', () => {
  let component: LanguagesKnownComponent;
  let fixture: ComponentFixture<LanguagesKnownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesKnownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesKnownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
