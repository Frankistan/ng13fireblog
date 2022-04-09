import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { NotificationService } from '@app/services/notification.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _rtr: Router,
        private _ntf: NotificationService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._auth.isAuthenticated$.pipe(map((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this._ntf.open('toast.logged_in', 'X', 1000);
                this._rtr.navigate(['/posts']);
            }
            return !isAuthenticated;
        }));
    }

}
