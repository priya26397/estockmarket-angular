import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import { ViewStockComponent } from './stock/view-stock/view-stock.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addCompany', component: AddCompanyComponent },
  { path: 'viewCompany', component: ViewCompanyComponent },
  { path: 'addStock', component: AddStockComponent },
  { path: 'viewStock', component: ViewStockComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
