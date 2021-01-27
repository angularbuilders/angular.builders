import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubFormComponent } from './course-sub-form.component';

describe('CourseSubFormComponent', () => {
  let component: CourseSubFormComponent;
  let fixture: ComponentFixture<CourseSubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSubFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
