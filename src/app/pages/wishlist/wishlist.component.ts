import { DataFromWishlist } from './../../core/interfaces/types.interface';
import { ProductService } from './../../core/services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ToastrService } from 'ngx-toastr';
import { log } from 'node:console';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

wishlistProduct !: DataFromWishlist[];
isLoading : boolean = false ;
removeLoading : boolean = false ;
private toastr = inject(ToastrService);


constructor(private wishList : WishlistService , private activteRoute : ActivatedRoute , private products : ProductService){}


ngOnInit(): void {
this.getProductsFromWishlist();
}





// addToWishList(productId:string){
// this.wishList.addToWishlist(productId).subscribe({
// next : (res)=>{
// console.log(res);
// },
// error:(err)=>{
// console.log(err);
// }
// })


// }



getProductsFromWishlist(){
this.isLoading = true ;
this.wishList.getWishlist().subscribe({
next : (response)=>{
this.isLoading = false ;
this.wishlistProduct = response.data ;
this.toastr.success("Welcome To Wishlist");
},
error : (error)=>{
console.log(error);
this.isLoading = false ;
}
})
}




removeProductFromWishlist(productId : string){
this.removeLoading = true ;
this.wishList.removeProduct(productId).subscribe({
next:(response)=>{
this.toastr.success("The Product Deleted Success");
this.removeLoading = false ;
this.getProductsFromWishlist();
},
error : (error)=>{
this.toastr.error("Failed Process");
this.removeLoading = false ;
}
})
}


}
