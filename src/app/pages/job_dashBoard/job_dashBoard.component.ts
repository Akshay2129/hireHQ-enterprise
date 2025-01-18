import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-job',
  imports: [TableComponent, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './job_dashBoard.component.html',
  styleUrl: './job_dashBoard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JobComponent {
  constructor(private router: Router) {

  }
  jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      status: 'Active',
      workType: 'Remote',
      location: 'New York',
      openings: 1,
    },

    {
      id: 2,
      title: 'Product Manager',
      status: 'Inactive',
      workType: 'Onsite',
      location: 'San Francisco',
      openings: 1,
    },
  ];

  filterSidebarVisible = false;
  uploadDropdownVisible = false;

  selectedStatus = '';
  selectedWorkType = '';
  selectedLocation = '';

  openFilterSidebar() {
    this.filterSidebarVisible = true;
  }

  closeFilterSidebar() {
    this.filterSidebarVisible = false;
  }

  toggleUploadDropdown() {
    this.uploadDropdownVisible = !this.uploadDropdownVisible;
  }

  uploadFile() {
    console.log('Upload File clicked');
    this.uploadDropdownVisible = false;
  }

  viewJobLog() {
    this.router.navigateByUrl('enterprise/JobLogs')
    this.uploadDropdownVisible = false;
  }

  // Dropdown options
  dropdownOpen: { [key: string]: boolean } = {
    status: false,
    workType: false,
    location: false
  };
  selectedStatuses: string[] = [];
  statusOptions = ['Open', 'Pending', 'Completed', 'Closed'];

  selectedWorkTypes: string[] = [];
  workTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  selectedLocations: string[] = [];
  locationOptions = ['New York', 'Los Angeles', 'Chicago', 'Houston'];

  toggleDropdown(type: string): void {
    this.dropdownOpen[type] = !this.dropdownOpen[type];
  }

  addItem(type: string, item: string): void {
    const selectedArray = this.getSelectedArray(type);
    if (!selectedArray.includes(item)) {
      selectedArray.push(item);
    }
    this.dropdownOpen[type] = false; 
  }

  removeItem(type: string, item: string): void {
    const selectedArray = this.getSelectedArray(type);
    const index = selectedArray.indexOf(item);
    if (index > -1) {
      selectedArray.splice(index, 1); // Remove the selected item
    }
  }

  getSelectedArray(type: string): string[] {
    if (type === 'status') return this.selectedStatuses;
    if (type === 'workType') return this.selectedWorkTypes;
    if (type === 'location') return this.selectedLocations;
    return [];
  }
  jobList = [
    {
      title: 'Java Developer',
      created_on: "Dec 18,2024; 16:30",
      location: "Noida, India",
      Status: 'Open',
      openings: 4,
      managerName: 'Nikhil',
      workType: 'Part-time',
    },
    {
      title: 'flutter Developer',
      created_on: "Dec 18,2024; 16:30",
      location: "Delhi, India",
      Status: 'Canceled',
      openings: 3,
      managerName: 'Shankar',
      workType: 'Part-time',
    },
    {
      title: 'Node Developer',
      created_on: "Dec 18,2024; 16:30",
      location: "Mumbai, India",
      Status: 'Open',
      openings: 3,
      managerName: 'Rohit',
      workType: 'Part-time',
    },
    {
      title: 'Node Developer',
      created_on: "Dec 18,2024; 16:30",
      location: "Mumbai, India",
      Status: 'Hold',
      openings: 3,
      managerName: 'Rohit',
      workType: 'Part-time',
    },
    {
      title: 'Node Developer',
      created_on: "Dec 18,2024; 16:30",
      location: "Mumbai, India",
      Status: 'Pending',
      openings: 3,
      managerName: 'Rohit',
      workType: 'Part-time',
    },
    // Add more job objects



  ];
  handleShare(job: any) {
    console.log('Share:', job);
  }

  handleEdit(job: any) {
    console.log('Edit:', job);
  }

  handleMore(job: any) {
    console.log('More:', job);
  }
  CreateJob() {
    this.router.navigateByUrl('enterprise/postJob')
  }
}
