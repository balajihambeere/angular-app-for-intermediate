import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component(
    {
        selector: 'app-customer-list',
        templateUrl: './customer-list.component.html',
        styleUrls: ['./customer-list.component.css']
    }
)
export class CustomerListComponent implements OnInit {
    customers = new Array<Customer>();

    constructor(private customerService: CustomerService) {
    }

    ngOnInit() {
        this.customerService.getCustomers().subscribe((data) => {
            this.customers = data;
        });
    }
}
