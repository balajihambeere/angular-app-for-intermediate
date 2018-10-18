import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-create-customer',
    templateUrl: './customer-create.component.html',
    styles: [`
    .inputWidth {
        line-height: 2em;
        width:20em;
        margin-bottom: 1em;
    }`]
})

export class CustomerCreateComponent {
    customer = new Customer();
    message: string;
    submitted = false;

    constructor(private customerService: CustomerService,
        private router: Router,
        private location: Location) {

    }



    submit(valid) {
        if (valid) {
            this.submitted = true;
            this.customerService.addCustomer(this.customer).subscribe((data) => {
                this.message = 'Customer Added Successfully';
                setTimeout(() => {
                    this.router.navigate(['/customers']);
                }, 1000);
            });
        } else {
            this.submitted = false;
        }
    }

    goBack(): void {
        this.location.back();
    }
}
