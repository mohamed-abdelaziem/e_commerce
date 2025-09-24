import { WishlistService } from './../../../core/services/wishlist.service';
import { CartService } from './../../../core/services/cart.service';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/types.interface';
import { RouterLink } from '@angular/router';
import {  TitleCasePipe} from '@angular/common';
import { TestPipe } from '../../pipes/test-pipe';
import { TestUpperCasePipe } from '../../pipes/test-upper-case-pipe';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink , TestPipe , TestUpperCasePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {



private cartService = inject(CartService);
private tostar = inject(ToastrService);
private wishlist = inject(WishlistService);

@Input()
product !: Product;


@Input()
Data !: Product; 




addProductToCart(productId : string){
this.cartService.addToCart(productId).subscribe({
next : (res)=>{
console.log(res)
this.tostar.success(res.message);
},

error : (err)=>{
console.log(err);
this.tostar.error(err);
}
})
}




addProductToWishlist(productId : string){
console.log("run");

this.wishlist.addToWishlist(productId).subscribe({
next : (response)=>{
// console.log(response);
this.tostar.success(response.message)
},
error : (error)=>{
this.tostar.error("Failed Process");
}
})
}



}
