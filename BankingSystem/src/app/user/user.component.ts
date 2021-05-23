import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms'
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  isAddMode = false;
  currentUser: User[] = [];

  constructor(private userService: UserService) {

  }

  ngOnInit() {

    this.userForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, [Validators.required]),
      'gender': new FormControl('female'),
      'dateOfBirth': new FormControl(null, Validators.required),
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'pinCode': new FormControl(null, Validators.required),
      'nationality': new FormControl(null, Validators.required)
    });

    if (!this.isAddMode) {
      this.userService.fetchUser('test@example.com').subscribe(posts => {
        this.userForm.patchValue({
          'firstName': posts.FirstName,
          'lastName': posts.LastName,
          'gender': posts.Gender,
          'dateOfBirth': posts.DateOfBirth,
          'emailAddress': posts.EmailAddress,
          'address': posts.Address,
          'password': posts.Password,
          'state': posts.State,
          'pinCode': posts.PinCode,
          'nationality': posts.Nationality
        });
        console.log(posts);
      });
    }
  }

  onSubmit() {

    console.log(this.userForm);

    const userData: User = {
      CustomerID: 0,
      FirstName: this.userForm.value.firstName,
      LastName: this.userForm.value.lastName,
      Gender: String(this.userForm.value.gender),
      DateOfBirth: this.userForm.value.dateOfBirth,
      EmailAddress: String(this.userForm.value.emailAddress),
      Address: String(this.userForm.value.address),
      Password: String(this.userForm.value.password),
      State: String(this.userForm.value.state),
      PinCode: String(this.userForm.value.pinCode),
      Nationality: String(this.userForm.value.nationality)
    };

    this.userService.SaveUser(userData);
  }


}
