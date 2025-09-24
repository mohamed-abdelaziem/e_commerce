import { Router } from '@angular/router';
import {
  Component,
  Inject,
  OnInit,
  signal,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  imports: [
    HomeComponent,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    ProductCardComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('eCommerce');

  private router = inject(Router);
  private cartService = inject(CartService);
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.authService.decodeToken(token);
        this.authService.userData.next(true);
      }
    }
  }

  ngOnInit(): void {
    initFlowbite();
 
  
  }




}
