// import { initFlowbite } from 'flowbite';
import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flow-bite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(
    private flowbiteService: FlowbiteService,
    private authService: AuthService
  ) {}

  pages = [
    { path: '/home', title: 'Home' },
    { path: '/products', title: 'Products' },
    { path: '/categories', title: 'Categories' },
    { path: '/brands', title: 'Brands' },
    { path: '/cart', title: 'Cart' },
    { path: '/wishlist', title: 'wishist' },
  ];

  authPages = [
    { path: 'login', title: 'Login' },
    { path: 'register', title: 'Register' },
  ];

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.authService.userData.subscribe({
      next: (res) => {
        console.log(res, 'navbar');
        res == true ? (this.isLogin = true) : (this.isLogin = false);
      },
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
