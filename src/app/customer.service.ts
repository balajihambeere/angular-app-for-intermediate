import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Customer } from './customer.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CustomerService {

    constructor(private http: HttpClient,
        private router: Router) {
    }

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(environment.api_url + 'customers')
            .pipe(
                catchError(this.handleError)
            );
    }

    getCustomer(id: string): Observable<Customer> {
        return this.http.get<Customer>(environment.api_url + 'customer/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    addCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(environment.api_url + 'customer', customer, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(environment.api_url + 'customer/' + customer._id, customer, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteCustomer(id: string): Observable<Customer> {
        return this.http.delete<Customer>(environment.api_url + 'customer/' + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            const result = `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`;
            console.error(result);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
}
