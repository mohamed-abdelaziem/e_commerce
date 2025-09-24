import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Response } from '../interfaces/types.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
constructor(private http : HttpClient){}


getAllCategory():Observable<Response<Category>>{
return this.http.get<Response<Category>>(`${environment.baseUrl}/categories`)
}


getSpecificCategory(id:string):Observable<any>{
return this.http.get(`${environment.baseUrl}/categories/${id}`)
}








}
