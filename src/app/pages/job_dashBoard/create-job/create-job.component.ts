import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobBasicDetailsComponent } from './job-basic-details/job-basic-details.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobOtherDetailsComponent } from './job-other-details/job-other-details.component';
import { JobQualificationComponent } from './job-qualification/job-qualification.component';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
  imports: [
    JobBasicDetailsComponent,
    JobDescriptionComponent,
    JobOtherDetailsComponent,
    JobQualificationComponent,
    CommonModule,
  ],
  standalone: true,
})
export class CreateJobComponent {
  currentStep = 1; // Controls step navigation
  aggregatedFormData: any = {}; // Holds the combined data from all child components

  constructor(private router: Router) { }

  backToJob() {
    this.router.navigateByUrl('/enterprise/jobs');
  }

  showJobDescription: boolean = false;  // Controls visibility of components

  // onNextClicked(): void {
  //   // Set showJobDescription to true when next button is clicked
  //   this.showJobDescription = true;
  // }

  onNextClicked(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }  
     
  }

  onBackClicked(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  handleFormData(step: number, data: any): void {
    // Combine the step data into the aggregatedFormData object
    this.aggregatedFormData = { ...this.aggregatedFormData, ...data };
    console.log('Current Aggregated Data:',step, this.aggregatedFormData);
    if (step===4) {
      console.log('Final API Payload:',this.aggregatedFormData);
    }
  }

  submitJob() {
    // Final payload to match the required format
    const apiPayload = { ...this.aggregatedFormData };
    console.log('Final API Payload:', apiPayload);
    // API call or further processing can be done here
  }
}
