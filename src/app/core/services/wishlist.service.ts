import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { WishlistResponse } from '../interfaces/types.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
private http =  inject(HttpClient);


addToWishlist(productId : string):Observable<any>{
return this.http.post<any>(`${environment.baseUrl}/wishlist` , {productId} , 
{headers :{token : localStorage.getItem("token") || ""}}
)
}


getWishlist():Observable<WishlistResponse>{
return this.http.get<WishlistResponse>(`${environment.baseUrl}/wishlist` ,
{headers : {
token : localStorage?.getItem("token") || ""
}
}
)
}



removeProduct(productId : string):Observable<any>{
return this.http.delete(`${environment.baseUrl}/wishlist/${productId}`  ,
 {headers : 
{token : localStorage.getItem("token") || ""}
 }


)
}


}






