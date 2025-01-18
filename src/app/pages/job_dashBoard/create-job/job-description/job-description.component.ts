import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-job-description',
  imports: [],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.scss'
})
export class JobDescriptionComponent {
  @Output() nextClicked: EventEmitter<void> = new EventEmitter();
  @Output() backClicked: EventEmitter<void> = new EventEmitter();
  @Output() formData = new EventEmitter<any>();
  jobForm={
  title2: 'Javascript12',
}
  onSubmit(): void {
    this.nextClicked.emit();
   this.formData.emit(this.jobForm)
    console.log('Job Description:', this.jobForm);

  }

  onBack():void{
    // debugger
    this.backClicked.emit();
  }
}
