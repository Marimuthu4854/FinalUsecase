import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators'
import { Transaction } from "../models/transaction.model";

@Injectable()
export class TransactionService{

    constructor(private http:HttpClient){

    }

    SaveTransaction(transaction: Transaction) {
        this.http.post('https://newproject-e37f6-default-rtdb.firebaseio.com/transaction.json',
        transaction,
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

    fetchTransaction(mode: string) {
      const transactionData:Transaction[]=[];
      return this.http.get('https://newproject-e37f6-default-rtdb.firebaseio.com/transaction.json',
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
                    if (mode == 'MINI') {
                        transactionData.push(value);
                    }
                }
                console.log(transactionData);
                return transactionData;
            }))
        }
}