import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';
import { UserGuard } from './gaurd/user.guard';
import { AddSectorComponent } from './sector/add-sector/add-sector.component';
import { ViewSectorComponent } from './sector/view-sector/view-sector.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import { ViewStockComponent } from './stock/view-stock/view-stock.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'addCompany', component: AddCompanyComponent ,canActivate:[UserGuard]},
  { path: 'viewCompany', component: ViewCompanyComponent ,canActivate:[UserGuard]},
  { path: 'addStock', component: AddStockComponent ,canActivate:[UserGuard]},
  { path: 'viewStock', component: ViewStockComponent ,canActivate:[UserGuard]},
  { path: 'viewSector', component: ViewSectorComponent ,canActivate:[UserGuard]},
  { path: 'addSector', component: AddSectorComponent ,canActivate:[UserGuard]},
  {path:"**",redirectTo:'/login',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
