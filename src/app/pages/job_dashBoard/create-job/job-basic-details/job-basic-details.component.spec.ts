import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBasicDetailsComponent } from './job-basic-details.component';

describe('JobBasicDetailsComponent', () => {
  let component: JobBasicDetailsComponent;
  let fixture: ComponentFixture<JobBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBasicDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
