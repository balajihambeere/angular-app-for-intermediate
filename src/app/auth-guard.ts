import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate,
    Router, RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private jwtService: JwtService) {

    }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        if (this.jwtService.getToken()) {
            return of(true);
        } else {
            this.router.navigate(['**']);
            return of(false);
        }
    }
}
