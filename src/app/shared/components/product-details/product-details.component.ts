import { CartService } from './../../../core/services/cart.service';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/interfaces/types.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

isLoading : boolean = false;
product !: Product;


private cartService = inject(CartService);
private tostar = inject(ToastrService)

constructor(private productService : ProductService , private route : ActivatedRoute){}


ngOnInit(): void {
this.route.paramMap.subscribe((params)=>{
const id = params.get("id");
if(id){
this.getProductDetails(id);
}


})



}



getProductDetails(id:string){
this.isLoading = true
this.productService.getSpecificProduct(id).subscribe({
next:(response)=>{
this.product = response.data;
console.log(this.product);
this.isLoading = false
},

error: (err)=>{
console.log(err)
this.isLoading = false
}


})
}




 customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay : true ,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
  }



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


}
