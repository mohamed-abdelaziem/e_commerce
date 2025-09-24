import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {


isLoading = false ;
isLoadingVefiy = false;
isLoadingResetPassword = false ;

private router = inject(Router);


step = 1;

private authService = inject(AuthService);


private tostar = inject(ToastrService);

forgetPassword : FormGroup = new FormGroup({
email : new FormControl("" , [Validators.required , Validators.email]),
})


verifyCode : FormGroup = new FormGroup({
resetCode : new FormControl("" , [Validators.required , Validators.minLength(6)])
})


resetPassword : FormGroup = new FormGroup({
email : new FormControl("" , [Validators.required , Validators.email]),
newPassword : new FormControl("" , [Validators.required , Validators.minLength(6) , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
})






handleForgetPassword(){
if(this.forgetPassword.invalid){
this.forgetPassword.markAllAsTouched();
return ;
}
const email = this.forgetPassword.get("email")?.value;
this.resetPassword.get("email")?.patchValue(email || "");
this.isLoading = true;
this.authService.forgotPasswords({email : this.forgetPassword.get("email")?.value!}).subscribe({
next : (res)=>{
console.log("success");
this.step = 2;
this.isLoading = false;
},

error : (err)=>{
console.log("error")
this.isLoading = false;
}

})





}


handleVerfiyCode(){
if(this.verifyCode.invalid){
this.verifyCode.markAllAsTouched();
return
}
this.isLoadingVefiy = true ;
this.authService.verifyResetCode({resetCode : this.verifyCode.get("resetCode")?.value!}).subscribe({
next : (res)=>{
console.log("success from verfiy code")
this.isLoadingVefiy =false ;
this.step = 3 ;
},

error : (err)=>{
console.log(err)
this.isLoadingVefiy = false;
this.tostar.error("Please Enter Valid Code" , "Error");
}

})

}



handleResetPassword(){
if(this.resetPassword.invalid){
this.resetPassword.markAllAsTouched()
return ;
}
this.isLoadingResetPassword = true;
this.authService.resetPassword({email : this.resetPassword.get("email")?.value! , newPassword : this.resetPassword.get("newPassword")?.value!}).subscribe({
next : (res)=>{
this.tostar.success("The Process Successfull" , "Success");
localStorage.setItem("token" , res.token);
this.authService.decodeToken(localStorage.getItem("token")!);
this.router.navigate(["/home"]);
this.isLoadingResetPassword = false;
},

error : (err)=>{
this.tostar.error("Please Enter Valid Data" , "error");
this.isLoadingResetPassword = false;
}

})

this.tostar.success("Reset Password is Successfull" , "Success" , {timeOut : 1500 , progressBar : true})
}



get resetCodeController(){
return this.verifyCode.get("resetCode");
}







}
