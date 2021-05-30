import { Injectable } from '@angular/core';
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
 
        this.isloggedIn=true;
        this.userName=username;
        this.userFullName = FullName;
        return of(this.isloggedIn);
    }

    CurrentUserFullName(): string {
        return this.userFullName;
    }

    CurrentUserName(): string {
        return this.userName;
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