import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOtherDetailsComponent } from './job-other-details.component';

describe('JobOtherDetailsComponent', () => {
  let component: JobOtherDetailsComponent;
  let fixture: ComponentFixture<JobOtherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOtherDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOtherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
