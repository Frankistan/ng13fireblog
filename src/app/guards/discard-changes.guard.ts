import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: 'root'
})
export class DiscardChangesGuard implements CanDeactivate<CanComponentDeactivate> {
    // constructor(
    //     private _core:CoreService
    // ){}

    canDeactivate(
        component: CanComponentDeactivate,
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // this._core.isLoading.next(false);
        return component.canDeactivate();
    }
}
