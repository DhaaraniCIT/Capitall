import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PurchaseComponent } from './components/purchase/purchase.component';

const routes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'Product/:id', component: ProductComponent },
  { path: ':user/Dashboard', component: DashboardComponent},
  { path: 'sign-up', component:SignUpComponent},
  { path: 'Purchase', component:PurchaseComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
