import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../services/account.service';
import { BankAccount } from '../models/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  isAddMode = false;

  constructor(private accountService:BankAccountService) { }

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      'CustomerName': new FormControl(null, Validators.required),
      'AccountNumber': new FormControl(null, Validators.required),
      'AccountType': new FormControl(null, Validators.required),
      'AccountCategory': new FormControl(null, Validators.required),
      'Balance': new FormControl(null, Validators.required),
      'BranchID': new FormControl(null, Validators.required),
      'Status': new FormControl(null, Validators.required)
    });

  }

  onSubmit() {

    const bankaccount: BankAccount = {
      CustomerName:this.accountForm.value.CustomerName,
      AccountID:0,
      AccountType:this.accountForm.value.AccountType,
      AccountCategory:this.accountForm.value.AccountCategory,
      BranchID:this.accountForm.value.BranchID,
      Balance:this.accountForm.value.Balance,
      AccountNumber:this.accountForm.value.AccountNumber,
      Status:this.accountForm.value.Status,
      CreatedDate: Date.now.toString(),
      CreatedBy: 'marimuthuk',
      
    };

    this.accountService.SaveBankAccount(bankaccount);
  }
}
