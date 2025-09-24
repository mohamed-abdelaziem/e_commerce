import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Response } from '../interfaces/types.interface';
import { environment } from '../../../environments/environment.development';
interface Pagination{
limit ?: number ,
page ?: number 
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private readonly baseUrl = `${environment.baseUrl}/products`;


  constructor(private http :HttpClient){}


  getAllProducts({limit = 56 , page = 1} : Pagination):Observable<Response<Product>>{
    return this.http.get<Response<Product>>(`${this.baseUrl}?page=${page}&&limit=${limit}`)
  }


  getSpecificProduct(id:string):Observable<{data:Product}>{
    return this.http.get<{data:Product}>(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }


}
