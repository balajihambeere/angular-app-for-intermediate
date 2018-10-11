import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CustomerService } from './customer.service';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';

//Route Configuration
const appRoutes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'customer/details/:id', component: CustomerDetailsComponent },
  { path: 'customer/add', component: CustomerCreateComponent },
  { path: 'customer/edit/:id', component: CustomerEditComponent },
  { path: 'customer/delete/:id', component: CustomerDeleteComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerDetailsComponent,
    CustomerEditComponent,
    CustomerDeleteComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
