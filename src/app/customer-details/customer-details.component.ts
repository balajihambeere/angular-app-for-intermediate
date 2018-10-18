import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',

})
export class CustomerDetailsComponent implements OnInit {
    customer = new Customer();

    constructor(private customerService: CustomerService,
        private route: ActivatedRoute,
        private location: Location) {

    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.customerService.getCustomer(id).subscribe((data) => {
            this.customer = data;
        });
    }

    goBack(): void {
        this.location.back();
      }

}
