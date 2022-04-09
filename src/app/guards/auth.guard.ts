import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { NotificationService } from '@app/services/notification.service';
import { map, Observable, tap } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _rtr: Router,
        private _ntf: NotificationService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._auth.isAuthenticated$.pipe(map((isAuthenticated: boolean) => {

            if (!isAuthenticated || isAuthenticated == null) {
                this._ntf.open('toast.server.access_denied', 'toast.close', 1500);

                this._rtr.navigate(['/auth/login']);

            }

            return isAuthenticated;

        }));

    }

}
