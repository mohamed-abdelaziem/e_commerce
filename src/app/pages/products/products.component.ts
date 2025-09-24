import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/interfaces/types.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ActivatedRoute  , Router} from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-products',
  imports: [ProductCardComponent , NgxPaginationModule , DatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  limit = 10;
  currentPage = 1;
    totalItems = 0;
  //  p: number = 1;
  //   collection: any[] = someArrayOfThings; 

isLoading : boolean = false;






data !:Product[]; 
constructor(private productService:ProductService , private router : Router , private activatedRoute: ActivatedRoute){
    activatedRoute.queryParams.subscribe((params)=>{
    this.getAllProducts(params['page'] || 1, this.limit)
    })
}






ngOnInit(): void {
this.getAllProducts(1,this.limit)
}


getAllProducts(page : number , limit : number){
this.isLoading = true
this.productService.getAllProducts({page, limit}).subscribe({
next:(response)=>{
this.data=response.data;
this.isLoading = false ;
   this.totalItems = response.results;
       this.currentPage =  response.metadata.currentPage;
       this.limit = response.metadata.limit;
},

error:(error)=>{
console.log(error);
this.isLoading = false;
}

})
}



handlePageChange(pageNumber : number){
    // this.getAllProducts( pageNumber, this.limit);


    this.router.navigate([],
        {
      queryParams: { page: pageNumber },
      // !!!!!!!!!
      queryParamsHandling : "merge",
    }
     );

  }


}
