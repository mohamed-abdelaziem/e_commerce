import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { CheckoutSessionComponent } from './pages/checkout-session/checkout-session.component';

export const routes: Routes = [

{
path : "",
pathMatch : "full",
redirectTo : "home",
}

,
{
path : "home",
pathMatch : "full",
canActivate : [authGuard],
loadComponent : ()=> import("./pages/home/home.component").then(file=>file.HomeComponent),
title : "Home"
},

{
path : "cart",
canActivate : [authGuard],
loadComponent : ()=> import("./pages/cart/cart.component").then(file=>file.CartComponent),
title : "Cart"
},

{
path : "products",
canActivate : [authGuard],
loadComponent : ()=> import("./pages/products/products.component").then(file=>file.ProductsComponent),
title : "Product"
},


{
path : "categories",
canActivate : [authGuard],
loadComponent : ()=> import("./pages/categories/categories.component").then(file=>file.CategoriesComponent),
title : "Categories"
},


{
path : "checkout-session/:cartId" ,
canActivate : [authGuard] ,
loadComponent : ()=>import("./pages/checkout-session/checkout-session.component").then(file=>CheckoutSessionComponent),
title : "Checkout Session"
}
,
{
path : "brands",
canActivate : [authGuard],
loadComponent : ()=> import("./pages/brands/brands.component").then(file=>file.BrandsComponent),
title : "Brands"
},


{
path : "product-details/:id/:title",
canActivate : [authGuard],
loadComponent : ()=> import("./shared/components/product-details/product-details.component").then(file=>file.ProductDetailsComponent),
title : "Product Details"
},


{
path : "wishlist",
canActivate : [authGuard],
loadComponent : ()=> import("./pages/wishlist/wishlist.component").then(file=>file.WishlistComponent),
title : "wishList"
},

{
path : "resetPassword",
loadComponent : ()=> import("./pages/reset-password/reset-password.component").then(file=>file.ResetPasswordComponent),
title : "Reset Password"
},




{
path : "allorders",
loadComponent : ()=>import("./pages/allorders/allorders.component").then(file=>file.AllordersComponent),
title : "All Orders",
}

,

{
path : "login",
loadComponent : ()=> import("./pages/login/login.component").then(file=>file.LoginComponent),
title : "Login"
},

{
path : "register",
loadComponent : ()=> import("./pages/register/register.component").then(file=>file.RegisterComponent),
title : "Register"
},

{
path : "**",
loadComponent : ()=> import("./pages/notfound/notfound.component").then(file=>file.NotfoundComponent),
title : "Not Found"
},






];
