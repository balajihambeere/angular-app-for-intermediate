import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../customer.service";
import { Customer } from "../customer.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: 'customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.css']
})

export class CustomerEditComponent implements OnInit {
    customer = new Customer();
    message: string;
    constructor(private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location) {

    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.customerService.getCustomer(id).subscribe((data) => {
            this.customer = data;
        })
    }
    submit() {
        this.customerService.updateCustomer(this.customer).subscribe((data) => {
            this.message = "Customer Updated Successfully";
            setTimeout(() => {

                this.router.navigate(['/customers'])
            }, 500);
        });
    }

    goBack(): void {
        this.location.back();
    }

}