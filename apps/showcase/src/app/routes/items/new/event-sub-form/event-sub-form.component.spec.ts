import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubFormComponent } from './event-sub-form.component';

describe('EventSubFormComponent', () => {
  let component: EventSubFormComponent;
  let fixture: ComponentFixture<EventSubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSubFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
