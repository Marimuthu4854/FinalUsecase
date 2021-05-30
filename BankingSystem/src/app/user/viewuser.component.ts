import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-view',
  templateUrl: './viewuser.component.html'
})
export class ViewUserComponent implements OnInit {
  userForm!: FormGroup;
  isAddMode = false;
  currentUser : User[] = [];
  isSaved: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    this.userForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, [Validators.required]),
      'gender': new FormControl('female'),
      'dateOfBirth': new FormControl(null, Validators.required),
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'Username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'pinCode': new FormControl(null, Validators.required),
      'nationality': new FormControl(null, Validators.required)
    });

    if (this.route.snapshot.params['name'] != '') {
      this.isAddMode = false;
    }
    else {
      this.isAddMode = true;
    }
    
    if (!this.isAddMode) {
      this.userService.fetchUser(this.route.snapshot.params['name']).subscribe(posts => {
        this.currentUser.push(posts);
        console.log(this.currentUser);
        // this.currentUser[0].FirstName = posts.FirstName;
        // this.currentUser[0].LastName = posts.LastName;
        // this.currentUser[0].Gender = posts.Gender;
        // this.currentUser[0].DateOfBirth = posts.DateOfBirth;
        // this.currentUser[0].EmailAddress = posts.EmailAddress;
        // this.currentUser[0].Address = posts.Address;
        // this.currentUser[0].Password = posts.Password;
        // this.currentUser[0].State = posts.State;
        // this.currentUser[0].PinCode = posts.PinCode;
        // this.currentUser[0].Nationality = posts.Nationality;
        // this.currentUser[0].UserName = posts.UserName;
        
      });
    }
    console.log(this.currentUser);
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
      Nationality: String(this.userForm.value.nationality),
      UserName: String(this.userForm.value.Username)
    };

    if (this.isAddMode) {
      this.userService.SaveUser(userData).subscribe(result => {
        if (result != null) {
          alert('Success!');
          this.router.navigateByUrl('/userlist');
        }
        else {
          alert('failed');
        }
      });
    }
    else {
      console.log(userData);
      this.userService.UpdateUser(userData);
      this.isSaved = true;
      setTimeout(() => {
        this.isSaved = false;
        this.router.navigateByUrl('/userlist');
      }, 1000);

      //.subscribe(result => {
      //   if (result != null) {
      //     alert('Success!');
      //     this.router.navigateByUrl('/userlist');
      //   }
      //   else {
      //     alert('failed');
      //   }
      // });
    }
  }

  onReset() {
    this.userForm.reset();
  }

  onGoTo(){
      this.router.navigateByUrl('/userlist');
  }

}
