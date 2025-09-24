import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { platformBrowser } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { get } from 'http';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-checkout-session',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-session.component.html',
  styleUrl: './checkout-session.component.css'
})
export class CheckoutSessionComponent {


cashLoading : boolean = false ;
visaLoading : boolean = false ;
cartId : string | null = "";
private tostar = inject(ToastrService);


chekoutPayment = new FormGroup({
details : new FormControl("" , [Validators.required , Validators.minLength(2)]),
phone : new FormControl ("" , [Validators.required , Validators.pattern((/^01[0125][0-9]{8}$/))]),
city : new FormControl("" , [Validators.required ])
})

constructor(@Inject(PLATFORM_ID) private platformId: any , private router : Router , private activated : ActivatedRoute , private authService : AuthService ,  private cartService : CartService){}



ngOnInit(): void {
this.activated.paramMap.subscribe((params)=>{
const cartId = params.get("cartId");
this.cartId = cartId ;
});




}


handleFormCheckout(){
if(this.chekoutPayment.invalid){
this.chekoutPayment.markAllAsTouched();
return;
}
}

goToCashPayment(){
if(this.chekoutPayment.invalid){
this.chekoutPayment.markAllAsTouched();
console.log("error");
return ;
}

if(this.chekoutPayment.valid){
this.cashLoading = true;
this.cartService.payWithCash(this.cartId! ,
{details : this.chekoutPayment.get("details")?.value! , phone :this.chekoutPayment.get("phone")?.value!  , city : this.chekoutPayment.get("city")?.value!}).subscribe({
next : (res)=>{
console.log(res);
this.cashLoading = false;
this.router.navigate(["/allorders"]);
this.tostar.success("Process SuccessFull");
},

error : (err)=>{
console.log(err);
this.cashLoading = false ;
this.tostar.error("Process Failed Please Check Your Process Again");
}

})
}

}



goToVisaPayment(){
if(this.chekoutPayment.invalid){
this.chekoutPayment.markAllAsTouched();
return ;
}



if(this.chekoutPayment.valid){
this.visaLoading = true ;
this.cartService.checkoutWithVisa(this.cartId! ,
{details : this.chekoutPayment.get("details")?.value! , phone :this.chekoutPayment.get("phone")?.value!  , city : this.chekoutPayment.get("city")?.value!}).subscribe({
next : (res)=>{
console.log(res);
window.location.href = res.session.url;
this.visaLoading = false ;
this.tostar.success("Process SuccessFull");
},

error : (err)=>{
console.log(err);
this.visaLoading = false ;
this.tostar.error("Process Failed Please Check Your Process Again");
}

})
}





}






 }









