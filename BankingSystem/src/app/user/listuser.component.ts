import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
    selector: 'app-user-list',
    templateUrl: './listuser.component.html',
    styleUrls: ['./listuser.component.css']
})
export class ListUserComponent implements OnInit {
    errorMessage: string = '';
    isAddMode = false;
    userList: User[] = [];
    isAdmin: boolean = false;

    constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService) {

    }

    ngOnInit() {

        if (this.authService.isAdminUser()) {
            this.isAdmin = true;
            this.userService.fetchAllUser().subscribe(posts => {
                this.userList = posts;
            }, error => this.errorMessage = error);
        }
        else {
            this.isAdmin = false;
            this.userService.fetchUser(this.authService.CurrentUserName()).subscribe(posts => {
                this.userList.push(posts);
            }, error => this.errorMessage = error);
        }
    }

    onSubmit() {

    }
}
