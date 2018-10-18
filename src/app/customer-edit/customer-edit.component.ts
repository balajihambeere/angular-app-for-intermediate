import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styles: [`
    .inputWidth {
        line-height: 2em;
        width:20em;
        margin-bottom: 1em;
    }`]
})

export class CustomerEditComponent implements OnInit {
    customer = new Customer();
    message: string;
    submitted = false;

    constructor(private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location) {

    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.customerService.getCustomer(id).subscribe((data) => {
            this.customer = data;
        });
    }
    submit(valid) {
        if (valid) {
            this.submitted = true;
            this.customerService.updateCustomer(this.customer).subscribe((data) => {
                this.message = 'Customer Updated Successfully';
                setTimeout(() => {

                    this.router.navigate(['/customers']);
                }, 500);
            });
        } else {
            this.submitted = false;
        }
    }
    goBack(): void {
        this.location.back();
    }
}
