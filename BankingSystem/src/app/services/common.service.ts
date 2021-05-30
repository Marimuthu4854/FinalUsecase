import { User } from "../models/user.model";
import { Observable, Subject, throwError } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class CommonService {
    private subjectName = new Subject<any>();

    constructor() {

    }

    sendUpdate(isAdmin: boolean) {
        this.subjectName.next({ isAdmin: isAdmin });
    }

    getUpdate(): Observable<any> {
        return this.subjectName.asObservable();
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
       
        return throwError(errorMessage);
    }

    generateCustomerID(users: User) {

    }

    generateAccountNumber(users: User) {

    }

    generateTransactionID(users: User) {

    }

    generateBranchID(users: User) {

    }

    generateAccountID(users: User) {

    }
}