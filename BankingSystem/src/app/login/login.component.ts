import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'username1': new FormControl('admin', Validators.required),
      'password1': new FormControl('admin', [Validators.required])
    });
  }
  onSubmit() {
    console.log(this.loginForm.value.password1);
    if (this.loginForm.value.username1 == 'admin') {
      if (this.loginForm.value.username1 == 'admin' && this.loginForm.value.password1 == 'admin') {
        this.authService.login(this.loginForm.value.username1, this.loginForm.value.password1).subscribe(data => {
          this.router.navigate(['banking']);
        });
      }
      else {
        this.userService.fetchUser(this.loginForm.value.username1).pipe(first()).subscribe(records => {
          if (records && records?.FirstName?.toLowerCase() != this.loginForm.value.username1) {
            this.authService.login(this.loginForm.value.username1, this.loginForm.value.password1).subscribe(data => {
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
}