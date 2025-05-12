import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PharmacistComponent } from './pages/pharmacist/pharmacist.component'; 
import { CustomerComponent } from './pages/customer/customer.component'; 

const routes: Routes = [
  { path: '', component: IndexComponent }, // default route
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'pharmacist', component: PharmacistComponent },
  { path: 'customer', component: CustomerComponent },
  { path: '**', redirectTo: '' } // fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
