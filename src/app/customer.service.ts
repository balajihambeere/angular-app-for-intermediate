import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Customer } from "./customer.model";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) {
    }

    //get customers
    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(environment.api_url + 'customers');
    }

    //get customer by id
    getCustomer(id: string): Observable<Customer> {
        //retur
        return this.http.get<Customer>(environment.api_url +'customer/' + id);
    }

    //add customers
    addCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(environment.api_url +'customer', customer, httpOptions)
    }

    //update customers
    updateCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(environment.api_url +'customer/'+ customer._id, customer, httpOptions)
    }

    deleteCustomer(id: string): Observable<Customer> {
        return this.http.delete<Customer>(environment.api_url +'customer/' + id, httpOptions)
    }
}