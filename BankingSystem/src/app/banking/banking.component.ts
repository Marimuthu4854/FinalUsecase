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
  allAccounts: BankAccount[]=[];
  accounts: BankAccount[] = [];
  constructor(private accountService: BankAccountService, private router: Router) { }

  ngOnInit(): void {

    this.accountService.fetchBankAccount('').subscribe(posts => {
      this.accounts = posts;
      this.allAccounts = posts;
      console.log(this.accounts);
    })
  }

  btnMiniStatementClick() {
    this.router.navigateByUrl('/statement/1');
  }

}
