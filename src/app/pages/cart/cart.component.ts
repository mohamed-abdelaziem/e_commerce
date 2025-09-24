import { ToastrService } from 'ngx-toastr';
import { CartResponse } from '../../core/interfaces/types.interface';
import { CartService } from './../../core/services/cart.service';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  isLoading: boolean = false;
  loadingUpdateCart: boolean = false;
  loadingRemove : boolean = false ;
  private router = inject(Router);
  private tostar = inject(ToastrService);


  cartData: CartResponse | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
    
  }

  getCart() {
    this.isLoading = true;
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res;
        this.isLoading = false;
      },

      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  updateCart(count: number, productId: string) {
    this.loadingUpdateCart = true;
    this.cartService.updateProductCart(count.toString(), productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res;
        this.loadingUpdateCart = false;
      },

      error: (err) => {
        this.tostar.error(err, 'Error');
        this.loadingUpdateCart = false;
      },
    });
  }




  deleteSpecificProduct(productId : string){
    this.loadingRemove = true ;
    this.cartService.removeProduct(productId).subscribe({
      next : (res)=>{
        console.log("The New Data" , res);
        this.cartData = res ;
        this.loadingRemove = false ;
        this.tostar.success("The Product Deletd Success");
      },
      error : (err)=>{
        this.tostar.error(err , "Error");
        this.loadingRemove = false ;
        this.tostar.error("Failed Process");
      }

    })

  }


removeAllProduct(){
this.cartService.removeAllProduct().subscribe({
next : (res)=>{
console.log(res);
this.tostar.success("The Cart Is Deleted");
this.cartData = res ;
},

error : (err)=>{
console.log(err);
this.tostar.error("Process Failed");
}
})
}






}
