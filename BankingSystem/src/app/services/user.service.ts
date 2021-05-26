import { HttpClient, HttpHeaders } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { User } from "../models/user.model";


@Injectable()
export class UserService {
    userKey: any = '';

    constructor(private http: HttpClient) {

    }

    SaveUser(users: User) {
        return this.http.post('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json',
            users,
            {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json', 'crossDomain': 'true'
                })
            });
    }

    UpdateUser(users: User) {
        
       return this.fetchUserKeyByUsername(users.UserName).subscribe(keyName => {
         console.log(users);
           return this.http.put('https://newproject-e37f6-default-rtdb.firebaseio.com/user/' + keyName + '.json',
            users,
            {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json', 'crossDomain': 'true'
                })
            });
            
        }); 
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
                   
                    for (let value of Object.values(responseData)) {
                        if (name != '' && value.UserName == name) {
                            userData.push(value);
                        }
                        else if (name == '') {
                            userData.push(value);
                        }
                    }
                   
                    return userData[0];
                }));
    }

    fetchUserKeyByUsername(username: string) {

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
                    for (let value of Object.values(responseData)) {
                        if (username != '' && value.UserName == username) {
                            this.userKey = Object.keys(responseData).find(key => responseData[key] === value);
                        }
                    }
                    return this.userKey;
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

    checkLoginUser(username: string, password: string) {
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
                        if (value.UserName == username && value.Password == password) {
                            userData.push(value);
                        }
                    }
                    console.log(userData);
                    return userData[0];
                }));
    }
}
