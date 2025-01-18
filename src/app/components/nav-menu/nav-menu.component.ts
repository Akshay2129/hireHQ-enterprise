import { Component } from '@angular/core';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-menu',
  // standalone: true,
  imports: [],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  constructor(private toaster: ToastrService) {

  }
  isOpen = false;
  userLogged: boolean = true;
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  logout() {
    // const confirmation = window.confirm('Are you sure you want to logout?');
    // if (confirmation) {
      sessionStorage.clear();
      
      this.userLogged = false;
      window.location.reload();
    }
  // }

}
