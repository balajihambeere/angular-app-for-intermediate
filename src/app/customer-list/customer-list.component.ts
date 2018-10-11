import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../customer.service";
import { Customer } from "../customer.model";
import { Subject } from "rxjs";

@Component(
    {
        selector: 'customer-list',
        templateUrl: './customer-list.component.html',
        styleUrls: ['./customer-list.component.css']
    }
)
export class CustomerListComponent implements OnInit {
    customers = new Array<Customer>();
    private searchCustomers = new Subject<string>();

    constructor(private customerService: CustomerService) {

    }

    // Push a search term into the observable stream.
    search(searchItem: string): void {
        this.searchCustomers.next(searchItem);
    }

    ngOnInit() {
        this.customerService.getCustomers().subscribe((data) => {
            this.customers = data;
        })
    }
}