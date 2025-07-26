import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLinksCardComponent } from './contact-links-card.component';

describe('ContactLinksCardComponent', () => {
  let component: ContactLinksCardComponent;
  let fixture: ComponentFixture<ContactLinksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLinksCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactLinksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
