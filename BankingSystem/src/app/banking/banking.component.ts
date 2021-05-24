import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../models/account.model';
import { BankAccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {
  allAccounts: BankAccount[] = [];
  accounts: BankAccount[] = [];
  searchText: string = '';
  constructor(private accountService: BankAccountService, private router: Router) { }

  ngOnInit(): void {

    this.accountService.fetchBankAccount('').subscribe(posts => {
      this.accounts = posts;
      this.allAccounts = posts;
      console.log(this.accounts);
    })
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
