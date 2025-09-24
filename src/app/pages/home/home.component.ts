import { Category, Product } from './../../core/interfaces/types.interface';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductService } from '../../core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../core/services/category.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent , CarouselModule , FormsModule , SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
LoadingOfCategory : boolean = false;
isLoading : boolean = false;
categories !: Category[];
data !: Product[];


searchWord : string = '';

constructor(private productService : ProductService , private categoryService : CategoryService){}

ngOnInit(): void {
this.getAllProduct()
this.getAllCategories()
}

getAllProduct(){
this.isLoading = true;
this.productService.getAllProducts({page : 1 , limit : 50}).subscribe({
next: (response)=>{
this.data = response.data;
console.log(this.data);
this.isLoading = false;
},
error : (error)=>{
console.log(error);
this.isLoading = false;
}


})
}



 customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay : true ,
    autoplaySpeed : 500,
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
    margin : 10
  }




  getAllCategories(){
    this.LoadingOfCategory = true;
    this.categoryService.getAllCategory().subscribe({
      next : (response)=>{
        console.log(response);
        this.categories = response.data;
           this.LoadingOfCategory = false;
      },

      error : (err)=>{
      console.log(err)
         this.LoadingOfCategory = false;
      }



    })


  }







}
