import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private router: Router, 
    private authService: AuthService, 
    private userService: UserService,
    private Service: CommonService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'username1': new FormControl('admin', Validators.required),
      'password1': new FormControl('admin', [Validators.required])
    });
  }
  onSubmit() {
    
    if (this.loginForm.value.username1 == 'admin') {
      if (this.loginForm.value.username1 == 'admin' && this.loginForm.value.password1 == 'admin') {
        this.authService.login(this.loginForm.value.username1, this.loginForm.value.password1, 'Admin').subscribe(data => {
         
          this.Service.sendUpdate(true);
          this.router.navigate(['banking']);
        });
      }
      else {
        alert('Invalid username or password');
      }
    }
    else {
      this.userService.checkLoginUser(this.loginForm.value.username1, this.loginForm.value.password1).pipe(first()).subscribe(records => {
        if (records && records.UserName != null) {
          const Fullname: string = records.FirstName + ' ' + records.LastName;
          this.authService.login(this.loginForm.value.username1, this.loginForm.value.password1, Fullname).subscribe(data => {
            this.Service.sendUpdate(false);
            this.router.navigate(['banking']);
          });
        }
        else {
          alert('Invalid username or password');
        }
      }
      );
    }
  }
}