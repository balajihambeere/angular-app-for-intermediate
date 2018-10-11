import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, take } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private jwtService: JwtService,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        if (this.jwtService.getToken()) {
            return of(true);
        } else {
            this.router.navigate(['**']);
            return of(false);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        if (this.jwtService.getToken()) {
            return of(true);
        } else {
            this.router.navigate(['**']);
            return of(false);
        }
    }
}
