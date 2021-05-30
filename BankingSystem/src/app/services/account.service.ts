import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, first, map } from 'rxjs/operators'
import { BankAccount } from "../models/account.model";
import { CommonService } from "./common.service";


@Injectable()
export class BankAccountService {
    accountKey: any = '';

    constructor(private http: HttpClient, private commonService: CommonService) {

    }

    SaveBankAccount(account: BankAccount) {

        return this.http.post('https://newproject-e37f6-default-rtdb.firebaseio.com/bankaccount.json',
            account)
        .pipe(
            catchError(errorRes => this.commonService.handleError(errorRes))
        );
    }

    UpdateBankAccount(account: BankAccount) {
        return this.fetchBankAccountByNum(String(account.AccountNumber)).subscribe(keyName => {
            console.log(keyName);

            return this.http.post('https://newproject-e37f6-default-rtdb.firebaseio.com/bankaccount/' + keyName + '.json',
                account).pipe(
                    catchError(errorRes => this.commonService.handleError(errorRes))).subscribe();
        });
    }

    fetchAllBankAccount() {
        const accountList: BankAccount[] = [];
        return this.http.get('https://newproject-e37f6-default-rtdb.firebaseio.com/bankaccount.json')
            .pipe(

                map(responseData => {

                    for (let value of Object.values(responseData)) {
                        accountList.push(value);
                    }

                    return accountList;
                }),
                catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    fetchBankAccountByUserName(UserName: string) {
        const accountList: BankAccount[] = [];
        return this.http.get('https://newproject-e37f6-default-rtdb.firebaseio.com/bankaccount.json')
            .pipe(

                map(responseData => {

                    for (let value of Object.values(responseData)) {
                        if (UserName == '') {
                            accountList.push(value);
                        }
                        else if (value.UserName == UserName) {
                            accountList.push(value);
                        }
                    }

                    return accountList;
                }),
                catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    fetchBankAccountByNum(AccountNumber: string) {
        const accountList: BankAccount[] = [];
        return this.http.get('https://newproject-e37f6-default-rtdb.firebaseio.com/bankaccount.json')
            .pipe(

                map(responseData => {

                    for (let value of Object.values(responseData)) {
                        if (AccountNumber == '') {
                            accountList.push(value);
                        }
                        else if (value.AccountNumber == AccountNumber) {
                            accountList.push(value);
                        }
                    }

                    return accountList[0];
                }),
                catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    fetchAccountKeyByAccNum(AccNum: string) {

        return this.http.get<{ [key: string]: BankAccount }>('https://newproject-e37f6-default-rtdb.firebaseio.com/bankaccount.json')
            .pipe(
                map(responseData => {
                    for (let value of Object.values(responseData)) {
                        if (AccNum != '' && String(value.AccountNumber) == AccNum) {
                            this.accountKey = Object.keys(responseData).find(key => responseData[key] === value);
                        }
                    }
                    return this.accountKey;
                }),
                catchError(errorRes => this.commonService.handleError(errorRes)));
    }
}
