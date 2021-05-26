import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
import { of } from 'rxjs';
 
@Injectable()
export class AuthService { 
 
    private isloggedIn: boolean;
    private userName:string = '';
    private userFullName:string = '';
 
    constructor() {
        this.isloggedIn=false;
    }
 
    login(username: string, password:string, FullName:string) {
 
        //Assuming users are provided the correct credentials.
        //In real app you will query the database to verify.
        this.isloggedIn=true;
        this.userName=username;
        this.userFullName = FullName;
        return of(this.isloggedIn);
    }

    CurrentUserFullName(): string {
        return this.userFullName;
    }
 
    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }
 
    isAdminUser():boolean {
        if (this.userName=='admin') {
            return true; 
        }
        return false;
    }
    
    logoutUser(): void{
        this.isloggedIn = false;
    }
 
} 