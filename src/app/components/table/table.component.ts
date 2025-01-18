import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  dropdownOpen: number | null = null; 
  
  toggleDropdown(index: number): void {
    this.dropdownOpen = this.dropdownOpen === index ? null : index;
  }

  jobs = [
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Open',
      openings: 1,
      applicants: 0,
      jobmanager:'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Closed',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Pending',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Hold',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Cancelled',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Open',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Closed',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Pending',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Hold',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Open',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Closed',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Pending',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
    {
      title: 'Java Developer',
      createdOn: 'Dec 18, 2024 - 16:30',
      location: 'Noida, India',
      status: 'Hold',
      openings: 1,
      applicants: 0,
      jobmanager: 'Neha Padwal',
      managerImage: 'https://example.com/image1.jpg', 
      worktype: 'Part Time',
    },
  ];
 
  allColumns = ['Created On', 'Location', 'Status', '# Openings', '# Applicants', 'Job Manager', 'Work Type'];
  visibleColumns = [...this.allColumns.slice(0, 7)];

  columnMapping: Record<string, string> = {
    'Created On': 'createdOn',
    'Location': 'location',
    'Status': 'status',
    '# Openings': 'openings',
    '# Applicants': 'applicants',
    'Job Manager': 'jobmanager',
    managerImage: 'https://example.com/image1.jpg', 
    'Work Type': 'worktype',
  };
 
  getJobValue(job: any, column: keyof typeof this.columnMapping): any {
    const key = this.columnMapping[column];
    return job[key] || 'N/A';
  }



  getStatusClass(status: string): string {
    switch (status) {
      case 'Open':
        return 'border-green-500 text-green-500';
      case 'Closed':
        return 'border-red-500 text-red-500';
      case 'Pending':
        return 'border-yellow-500 text-yellow-500';
      case 'Hold':
        return 'border-blue-500 text-blue-500';
      case 'Cancelled':
        return 'border-gray-500 text-gray-500';
      default:
        return '';
    }
  }
  
}
