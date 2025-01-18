import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-job-other-details',
  imports: [],
  templateUrl: './job-other-details.component.html',
  styleUrl: './job-other-details.component.scss'
})
export class JobOtherDetailsComponent {
@Output() nextClicked: EventEmitter<void> = new EventEmitter();
  @Output() backClicked: EventEmitter<void> = new EventEmitter();
  @Output() formData = new EventEmitter<any>();
  jobForm={
    job_type: 'Id Developer13',
  }
  onSubmit(): void {
    this.nextClicked.emit();
    this.formData.emit(this.jobForm)
    console.log('Job Other Details:', this.jobForm);
  }

  onBack():void{
    // debugger
    this.backClicked.emit();
  }
}
