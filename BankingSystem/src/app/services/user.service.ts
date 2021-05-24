import { HttpClient, HttpHeaders } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators'
import { User } from "../models/user.model";


@Injectable()
export class UserService {

    constructor(private http: HttpClient) {

    }

    SaveUser(users: User) {
        this.http.post('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json',
            users,
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
            .subscribe(products => {
                console.log(products);
            })
    }

    fetchUser(name: string) {
        const userData: User[] = [];
        return this.http.get<{ [key: string]: User }>('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json',
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
                    console.log(responseData);
                    for (let value of Object.values(responseData)) {
                        if (name !='' && value.EmailAddress == name) {
                            userData.push(value);
                        }
                        else if(name ==''){
                            userData.push(value);
                        }
                    }
                    console.log(userData);
                    return userData[0];
                }));
    }

    fetchAllUser() {
        const userData: User[] = [];
        return this.http.get<{ [key: string]: User }>('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json',
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
                    console.log(responseData);
                    for (let value of Object.values(responseData)) {
                        
                            userData.push(value);
                        
                    }
                    console.log(userData);
                    return userData;
                }));
    }
}