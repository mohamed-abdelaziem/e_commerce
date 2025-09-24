import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Brand, Brands } from '../../core/interfaces/types.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{

loadingBrand : boolean = false ;

private brandService = inject(BrandService);


allBrands !: Brand[] ;


ngOnInit(): void {
this.getAllBrand();
}


getAllBrand(){
this.loadingBrand = true ;
this.brandService.getAllBrand().subscribe({
next : (res)=>{
this.allBrands = res.data ;
this.loadingBrand = false ;
console.log(this.allBrands);
},

error : (err)=>{
this.loadingBrand = false ;
}

})
}










}
