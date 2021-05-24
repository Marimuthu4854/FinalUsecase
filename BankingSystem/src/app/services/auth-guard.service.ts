import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
 
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private _router:Router, private authService:AuthService ) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        //check some condition  
        if (!this.authService.isUserLoggedIn())  {
            this._router.navigate( ['login']);
            //redirect to login/home page etc
            //return false to cancel the navigation
            return false;
        } 
        return true;
    }
 
}