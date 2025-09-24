import { environment} from './../../../environments/environment.development';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CheckOutResponise, Root } from '../interfaces/types.interface';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  

private http = inject(HttpClient)


addToCart(productId:string):Observable<any>{
return this.http.post(`${environment.baseUrl}/cart` , {productId} , {
headers : {
token : localStorage?.getItem("token") || ""
}
})
}

updateProductCart(count:string , productId : string):Observable<any>{
return this.http.put(`${environment.baseUrl}/cart/${productId}` , {count} , {
headers : {
token : localStorage?.getItem("token") || ""
}
})
}



getUserCart():Observable<any>{
return this.http.get(`${environment.baseUrl}/cart` ,
{headers : {
token : localStorage?.getItem("token") || ""
}
})
}


removeProduct(productId : string) : Observable<any>{
return this.http.delete(`${environment.baseUrl}/cart/${productId}` , 
{
headers :{
token : localStorage?.getItem("token") || ""
}
}
)
}


removeAllProduct():Observable<any>{
return this.http.delete(`${environment.baseUrl}/cart` , {
headers : {
token : localStorage?.getItem("token") || ""
}
})
}


// https://ecommerce.routemisr.com/api/v1/orders/checkout-session/68c8975340a52971879c5571?url=http://localhost:4200/

checkoutWithVisa(cart_id:string ,shippingAddress :{details : string , phone : string , city : string}):Observable<CheckOutResponise>{
return this.http.post<CheckOutResponise>(`${environment.baseUrl}/orders/checkout-session/${cart_id}?url=http://localhost:4200` , {

    shippingAddress:shippingAddress,



}, {headers : {token : localStorage.getItem("token") || ""}})
}


payWithCash(cartId : string ,shippingAddress :{details : string , phone : string , city : string} ):Observable<any>{
return this.http.post<any>(`${environment.baseUrl}/orders/${cartId}` ,{shippingAddress} ,
{headers : {token : localStorage.getItem("token") || ""}})
}




getUserOrder(userId : any):Observable<Root>{
return this.http.get<Root>(`${environment.baseUrl}/orders/user/${userId}`);
}



}
