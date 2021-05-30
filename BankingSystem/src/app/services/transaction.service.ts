import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from 'rxjs/operators'
import { Transaction } from "../models/transaction.model";
import { CommonService } from "./common.service";

@Injectable()
export class TransactionService{

    constructor(private http:HttpClient, private commonService: CommonService ){

    }

    SaveTransaction(transaction: Transaction) {
       return this.http.post('https://newproject-e37f6-default-rtdb.firebaseio.com/transaction.json',
        transaction)
            .pipe(map(responseData => {
                return responseData;
            }), catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    fetchTransaction(mode: string) {
      const transactionData:Transaction[]=[];
      return this.http.get('https://newproject-e37f6-default-rtdb.firebaseio.com/transaction.json')
            .pipe(
                map(responseData => {

                for (let value of Object.values(responseData)) {
                    if (mode == 'MINI') {
                        transactionData.push(value);
                    }
                }
                console.log(transactionData);
                return transactionData;
            }), catchError(errorRes => this.commonService.handleError(errorRes)))
        }
}