import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private jwtService: JwtService) {
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

    authentication(type, source): Observable<User> {
        const route = (type === 'login') ? 'api/account/login' : 'api/account/register';
        return this.http.post<User>(route, source)
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
