import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from 'rxjs/operators'
import { User } from "../models/user.model";
import { CommonService } from "./common.service";

@Injectable()
export class UserService {
    userKey: any = '';

    constructor(private http: HttpClient, private commonService: CommonService) {

    }

    SaveUser(users: User) {
        return this.http.post('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json',
            users).pipe(catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    UpdateUser(users: User) {

        return this.fetchUserKeyByUsername(users.UserName).subscribe(keyName => {
            console.log(users);
            return this.http.put('https://newproject-e37f6-default-rtdb.firebaseio.com/user/' + keyName + '.json',
                users);

        },
            catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    fetchUser(name: string) {
        const userData: User[] = [];
        return this.http.get<{ [key: string]: User }>('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json')
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
                }), catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    fetchUserKeyByUsername(username: string) {

        return this.http.get<{ [key: string]: User }>('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json')
            .pipe(

                map(responseData => {
                    for (let value of Object.values(responseData)) {
                        if (username != '' && value.UserName == username) {
                            this.userKey = Object.keys(responseData).find(key => responseData[key] === value);
                        }
                    }
                    return this.userKey;
                }), catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    fetchAllUser() {
        const userData: User[] = [];
        return this.http.get<{ [key: string]: User }>('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json')
            .pipe(
                map(responseData => {
                    console.log(responseData);
                    for (let value of Object.values(responseData)) {

                        userData.push(value);

                    }
                    console.log(userData);
                    return userData;
                }), catchError(errorRes => this.commonService.handleError(errorRes)));
    }

    checkLoginUser(username: string, password: string) {
        const userData: User[] = [];
        return this.http.get<{ [key: string]: User }>('https://newproject-e37f6-default-rtdb.firebaseio.com/user.json')
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
                }), catchError(errorRes => this.commonService.handleError(errorRes)));
    }
}
