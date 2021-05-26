import { User } from "../models/user.model";
import { Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class CommonService {
    private subjectName = new Subject<any>();

    constructor() {

    }

    sendUpdate(isAdmin: boolean) { //the component that wants to update something, calls this fn
        this.subjectName.next({ isAdmin: isAdmin }); //next() will feed the value in Subject
    }

    getUpdate(): Observable<any> { //the receiver component calls this function 
        return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
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