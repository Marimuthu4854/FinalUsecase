import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators'
import { BankAccount } from "../models/account.model";

@Injectable()
export class BankAccountService {

    constructor(private http: HttpClient) {

    }

    SaveBankAccount(account: BankAccount) {
        
        this.http.post('https://newproject-e37f6-default-rtdb.firebaseio.com/bankaccount.json',
            account,
            {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json', 'crossDomain': 'true'
                })
            })
            .pipe(map(responseData => {
                return responseData;
            }))
            .subscribe(result => {
                console.log(result);
            })
    }

    fetchBankAccount(name: string) {
        const accountList: BankAccount[] = [];
       return this.http.get('https://newproject-e37f6-default-rtdb.firebaseio.com/bankaccount.json',
            {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json', 'crossDomain': 'true'
                })
            })
            .pipe(
               
                map(responseData => {
                  
                    for (let value of Object.values(responseData)) {
                        
                            accountList.push(value);
                        
                    }
                   
                    return accountList;
                }));
    }
}