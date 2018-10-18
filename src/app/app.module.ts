import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerService } from './customer.service';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { AuthGuard } from './auth-guard';
import { IsAuthenticatedDirective } from './is-authenticated.directive';
import { httpInterceptorProviders } from './interceptors';



const appRoutes: Routes = [
  {
    path: 'customers',
    component: CustomerListComponent
  },
  {
    path: 'customer/details/:id',
    component: CustomerDetailsComponent
  },
  {
    path: 'customer/add', component: CustomerCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/edit/:id', component: CustomerEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/delete/:id', component: CustomerDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerDetailsComponent,
    CustomerEditComponent,
    CustomerDeleteComponent,
    AuthComponent,
    IsAuthenticatedDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    httpInterceptorProviders,
    CustomerService, AuthService, JwtService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
}
