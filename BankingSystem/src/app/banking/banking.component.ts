import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../models/account.model';
import { BankAccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {
  allAccounts: BankAccount[] = [];
  accounts: BankAccount[] = [];
  searchText: string = '';
  isAdmin: boolean = false;
  errorMessage:string = '';

  constructor(
    private accountService: BankAccountService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

    if (this.authService.isAdminUser()) {
      this.isAdmin = true;
      this.accountService.fetchAllBankAccount().subscribe(posts => {
        this.accounts = posts;
        this.allAccounts = posts;
        console.log(this.accounts);
      },error => {
        this.errorMessage = error;
      }
      );
    }
    else {
      this.isAdmin = false;
      this.accountService.fetchBankAccountByUserName(this.authService.CurrentUserName()).subscribe(posts => {
        this.accounts = posts;
        this.allAccounts = posts;
        console.log(this.accounts);
      },error => {
        this.errorMessage = error;
      })
    }
  }

  onSearch() {

    if (this.searchText != '') {
      this.accounts = this.allAccounts.filter(
        currentUser => currentUser.CustomerName?.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    else {
      this.accounts = this.allAccounts;
    }
  }

  btnMiniStatementClick() {
    this.router.navigateByUrl('/statement/1');
  }
}
