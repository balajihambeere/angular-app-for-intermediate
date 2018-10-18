import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

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
            const user = new User();
            user.token = this.jwtService.getToken();
            this.setAuth(user);
        } else {
            this.purgeAuth();
        }
    }

    purgeAuth(): any {
        this.jwtService.destroyToken();
        this.currentUserSubject.next(new User());
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/customers']);
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
        const route = (type === 'login') ? environment.api_url + 'login' : environment.api_url + 'register';
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
