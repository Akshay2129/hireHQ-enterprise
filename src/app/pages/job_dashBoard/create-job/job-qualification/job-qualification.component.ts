import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-qualification',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './job-qualification.component.html',
  styleUrl: './job-qualification.component.scss'
})
export class JobQualificationComponent {
  @Output() nextClicked: EventEmitter<void> = new EventEmitter();
  @Output() backClicked: EventEmitter<void> = new EventEmitter();
  @Output() formData = new EventEmitter<any>();
  jobQualificationForm: FormGroup;
  isJobManagerChecked = true;
  isFlexiableInterViewChecked = false;

  constructor(private fb: FormBuilder) {
    this.jobQualificationForm = this.fb.group({
      educationLevel: ['', Validators.required],
      degreeName: [''],
      jobCategory: ['', Validators.required],
      seniorityLevel: ['', Validators.required],
      externalJobId: [''],
      jobTitle: ['', Validators.required],
      minWorkExperience: ['', Validators.required],
      maxWorkExperience: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      contractDuration: [''],
      frequency: [''],
      numberOfOpenings: [''],
      applicationLimit: [''],
      shortlistLimit: [''],
      jobStatus: ['', Validators.required],
      socialMediaUrl: [''],
    });
  }





  jobForm = {
    title1: 'BCA14',
  }
  onSubmit(): void {

    // if (this.jobQualificationForm.valid) {
    //   console.log('Form Submitted:', this.jobQualificationForm.value);
    //   // Handle form submission (e.g., API call)
    // } else {
    //   console.log('Form is invalid');
    // }

    this.nextClicked.emit();
    this.formData.emit(this.jobQualificationForm.value)
    console.log('Job Qualification:', this.jobForm);
  }

  onBack(): void {
    // debugger
    this.backClicked.emit();
  }
}
