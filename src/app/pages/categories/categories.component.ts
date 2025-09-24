import { Component } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { response } from 'express';
import { Category, Data } from '../../core/interfaces/types.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {


allCategory !: Category[] ;
loadingCategory : boolean = false ;

constructor(private cateGorySerive : CategoryService){}


ngOnInit(): void {
this.getAllCategory()
}


getAllCategory(){
this.loadingCategory = true ;
this.cateGorySerive.getAllCategory().subscribe({
next : (response)=>{
console.log(response.data);
this.loadingCategory = false ;
this.allCategory = response.data ;
},
error : (err)=>{
this.loadingCategory = false ;
}
})
}


}
