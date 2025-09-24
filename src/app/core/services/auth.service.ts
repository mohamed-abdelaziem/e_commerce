
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Payload } from '../interfaces/types.interface';

export interface Data {
name : string ,
password : string ,
rePassword : string ,
email : string ,
phone : string ,
}
export interface DataLogin {
password : string ,
email : string ,
}


@Injectable({
  providedIn: 'root'
})



export class AuthService {
  


constructor(private http : HttpClient , @Inject(PLATFORM_ID) private platformId: any , private router : Router){}



userData : BehaviorSubject<boolean> = new BehaviorSubject(false);




register(data : Data):Observable<any>{
return this.http.post(`${environment.baseUrl}/auth/signup` , data)
}


forgotPasswords(data : {email : string}):Observable<any>{
return this.http.post(`${environment.baseUrl}/auth/forgotPasswords` , data)
}


verifyResetCode(data : {resetCode : string}):Observable<any>{
return this.http.post(`${environment.baseUrl}/auth/verifyResetCode` , data)
}

changeMyPassword(data : {currentPassword : string , password : string , rePassword : string}):Observable<any>{
return this.http.put(`${environment.baseUrl}/auth/changeMyPassword` , data)
}

resetPassword(data : {email : string , newPassword : string}):Observable<any>{
return this.http.put(`${environment.baseUrl}/auth/resetPassword` , data);
}


updateMe(data : {name : string , email : string , phone : string}):Observable<any>{
return this.http.put(`${environment.baseUrl}/users/updateMe/` , data)
}








login(data : DataLogin):Observable<any>{
return this.http.post(`${environment.baseUrl}/auth/signin`,data)
}




decodeToken(token : string){
let decoded : Payload = jwtDecode(token);
this.userData.next(true);
return decoded;
}




logOut(){
if(isPlatformBrowser(this.platformId)){
localStorage.removeItem("token");
this.userData.next(false);
this.router.navigate(["/login"]);
}


  
}





}
