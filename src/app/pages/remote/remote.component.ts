import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavMenuComponent } from '../../components/nav-menu/nav-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remote',
  imports: [RouterOutlet, NavMenuComponent, RouterLink, CommonModule, RouterModule],
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss']
})
export class RemoteComponent {
  // Sidebar collapsed by default on large screens (width > 768px)
  isSidebarCollapsed = true;
  currentIndex: number = 0;

  menuItems = [
    { label: 'Jobs', icon: 'pi pi-briefcase', route: 'enterprise/jobs' },
    { label: 'Candidates', icon: 'pi pi-users', route: 'enterprise/candidates' },
    { label: 'Campaign', icon: 'pi pi-envelope', route: '' },
    { label: 'Talent Pool', icon: 'pi pi-users', route: '' },
    { label: 'Career Portal', icon: 'pi pi-desktop', route: '' },
    { label: 'Configuration Control', icon: 'pi pi-chart-bar', route: '' },
    { label: 'Analytics', icon: 'pi pi-lock', route: '/analytics' },
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustSidebarForSmallScreens(); // Adjust based on window size
    this.adjustSidebarForLargeScreens(); // Adjust for large screens on resize
  }

  ngOnInit(): void {
    this.adjustSidebarForSmallScreens(); // Initial check for small screen behavior
    this.adjustSidebarForLargeScreens(); // Initial check for large screen behavior
  }

  toggleSidebar(): void {
    // Toggle sidebar visibility on large screens (when width > 768px)
    if (window.innerWidth > 768) {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  private adjustSidebarForSmallScreens(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      // For small screens (width < 768px), always collapse the sidebar
      this.isSidebarCollapsed = screenWidth < 768;
    }
  }

  private adjustSidebarForLargeScreens(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      // For larger screens (width > 768px), keep the sidebar collapsed by default
      if (screenWidth > 768) {
        this.isSidebarCollapsed = true;
      }
    }
  }
}
