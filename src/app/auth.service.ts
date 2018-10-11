import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './auth.model';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private jwtService: JwtService,
        private router: Router) {
    }

    populate() {
        if (this.jwtService.getToken()) {
            this.http.get<User>('/user').subscribe(
                data => {
                    data.token = this.jwtService.getToken();
                    this.setAuth(data);
                    return data;
                },
                err => {
                    this.purgeAuth();
                    this.router.navigate(['**']);
                }
            );
        } else {
            this.purgeAuth();
        }
    }

    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next(new User());
        this.isAuthenticatedSubject.next(false);
    }

    setAuth(user: User) {
        if (user.token == null) {
            this.purgeAuth();
        } else {
            this.jwtService.saveToken(user.token);
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
        }
    }

    auth(type: String, user: User): Observable<User> {
        const route = (type === 'login') ? 'api/account/login' : 'api/account/register';
        return this.http.post<User>(route, user)
            .pipe(map(data => {
                if (type === 'login') {
                    this.setAuth(data);
                    return data;
                } else {
                    return data;
                }
            }));
    }
}
