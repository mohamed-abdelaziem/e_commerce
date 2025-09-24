import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DatePipe, isPlatformBrowser, SlicePipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Root } from '../../core/interfaces/types.interface';
import { RouterLink } from '@angular/router';
import { ReversePipe } from '../../shared/pipes/reverse-pipe';


@Component({
  selector: 'app-allorders',
  imports: [DatePipe, RouterLink , ReversePipe , SlicePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent {

isLoading : boolean = false ;
allOrders !: Root;

constructor(private authService : AuthService , @Inject(PLATFORM_ID) private platformId: any , private cartSerive : CartService){}


ngOnInit(): void {
this.getUserOrder();
}




getUserOrder(){
if(isPlatformBrowser(this.platformId)){
var token = localStorage.getItem("token");
this.authService.decodeToken(token!);
}
this.isLoading = true ;
this.cartSerive.getUserOrder(this.authService.decodeToken(token!).id).subscribe({
next : (res)=>{
console.log(this.authService.decodeToken(token!).id);
this.allOrders = res ;
this.isLoading = false ;
console.log(this.allOrders)
},
error : (err)=>{
console.log(err);
this.isLoading = false ;
}
});
}


}
