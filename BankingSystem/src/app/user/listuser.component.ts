import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListUserComponent implements OnInit {

  isAddMode = false;
  userList: User[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit() {
      this.userService.fetchAllUser().subscribe(posts => {
       this.userList = posts;
      });
  }

  onSubmit() {

  }
}
