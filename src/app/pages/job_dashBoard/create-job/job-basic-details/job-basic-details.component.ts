import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-basic-details',
  templateUrl: './job-basic-details.component.html',
  styleUrls: ['./job-basic-details.component.scss',
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class JobBasicDetailsComponent {
  uploadedFiles: { preview: string; name: string; url?: string }[] = [];
  isUploading = false;
  uploadProgress = 0;
  isDragging = false;
  jobForm: FormGroup;
  @Output() nextClicked: EventEmitter<void> = new EventEmitter();
  @Output() formData = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      externalJobId: ['',null],
      jobTitle: ['', Validators.required,],
      jobCategory: ['', Validators.required],
      workType: ['', Validators.required],
      department: [''],
      currency: ['', Validators.required],
      baseSalary: ['', Validators.required],
      paymentFrequency: ['', Validators.required],
      workplaceType: ['', Validators.required],
      location: ['', Validators.required],
      employeeBenefits: [''],
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      Array.from(files).forEach((file) => this.uploadFile(file));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      Array.from(files).forEach((file) => this.uploadFile(file));
    }
  }

  uploadFile(file: File): void {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB');
      return;
    }

    this.isUploading = true;
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        const fileDataUrl = e.target.result as string;

        const fileUrl = URL.createObjectURL(file);

        const interval = setInterval(() => {
          if (this.uploadProgress < 100) {
            this.uploadProgress += 10;
          } else {
            clearInterval(interval);
            this.isUploading = false;
            this.uploadedFiles.push({
              preview: fileDataUrl,
              name: file.name,
              url: fileUrl,
            });
          }
        }, 500);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.isUploading = false;
    };

    reader.readAsDataURL(file);
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  onSubmit(): void {
    // if (this.jobForm.valid) {
    //   console.log('Job Details:', this.jobForm.value);
    //   console.log('Uploaded Files:', this.uploadedFiles);
    //   this.nextClicked.emit();
    // } else {
    //   console.error('Form is invalid');
    // }
    this.formData.emit(this.jobForm.value)
      this.nextClicked.emit();
      console.log('Basic Job Details',this.jobForm.value);
   
  }
}
