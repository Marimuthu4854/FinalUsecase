import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userFullname: string = '';
  isAdmin: boolean = false;
  subscriptionName!: Subscription;

  constructor(private authService: AuthService, private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {

    this.subscriptionName = this.commonService.getUpdate().subscribe
      (message => { //message contains the data sent from service
        this.isAdmin = message;
      });

    if (this.authService.isAdminUser()) {
      this.isAdmin = true;
      this.userFullname = 'Admin';
      alert(this.isAdmin);
    }
    else {
      this.isAdmin = false;
      this.userFullname = this.authService.CurrentUserFullName();
    }
  }

  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['login']);

  }
}
