import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-customer-delete',
    templateUrl: './customer-delete.component.html'
})
export class CustomerDeleteComponent implements OnInit {
    customer = new Customer();
    message: string;
    constructor(private customerService: CustomerService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) {

    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.customerService.getCustomer(id).subscribe((data) => {
            this.customer = data;
        });
    }

    delete(id: string) {
        this.customerService.deleteCustomer(id).subscribe((data) => {
            this.message = 'customer delete successfully';
        });
    }

    goBack(): void {
        this.location.back();
    }
}
