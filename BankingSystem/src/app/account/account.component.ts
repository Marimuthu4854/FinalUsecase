import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../services/account.service';
import { BankAccount } from '../models/account.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { ObjectUnsubscribedError } from 'rxjs';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  isAddMode = false;
  users: User[] = [];
  selectUsername = '';
  defaultValue = 'Select';
  btnText: string = 'Save';
  errorMessage: string = '';
  isSaved: boolean = false;
  SuccessMessage: string = '';

  constructor(private accountService: BankAccountService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    this.userService.fetchAllUser().subscribe(result => {
      console.log(result);
      this.users = result;
    }, error => { this.errorMessage = error }
    )
  }

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      'CustomerName': new FormControl(this.defaultValue, Validators.required),
      'AccountNumber': new FormControl(null, Validators.required),
      'AccountType': new FormControl(null, Validators.required),
      'AccountCategory': new FormControl(null, Validators.required),
      'Balance': new FormControl(null, Validators.required),
      'BranchID': new FormControl(null, Validators.required),
      'Status': new FormControl(null, Validators.required),
      'Username': new FormControl(null)
    });

    if (this.route.snapshot.params['AccNum'] != '' && this.route.snapshot.params['AccNum'] != null) {
      this.isAddMode = false;
      this.btnText = "Update";
    }
    else {
      this.isAddMode = true;
      this.btnText = "Save";
    }

    if (!this.isAddMode) {
      this.accountService.fetchBankAccountByNum(this.route.snapshot.params['AccNum']).subscribe(posts => {
        this.accountForm.patchValue({
          'CustomerName': posts.UserName,
          'AccountNumber': posts.AccountNumber,
          'AccountType': posts.AccountType,
          'AccountCategory': posts.AccountCategory,
          'Balance': posts.Balance,
          'BranchID': posts.BranchID,
          'Status': posts.Status,
          'Username': posts.UserName
        });

      }, error => { this.errorMessage = error });
    }
  }

  onChange(deviceValue: any) {
    console.log(deviceValue);
  }

  onSubmit() {

    const bankaccount: BankAccount = {
      CustomerName: this.getUserfullname(this.accountForm.value.CustomerName),
      AccountID: 0,
      AccountType: this.accountForm.value.AccountType,
      AccountCategory: this.accountForm.value.AccountCategory,
      BranchID: this.accountForm.value.BranchID,
      Balance: this.accountForm.value.Balance,
      AccountNumber: this.accountForm.value.AccountNumber,
      Status: this.accountForm.value.Status,
      CreatedDate: Date(),
      CreatedBy: this.authService.CurrentUserName(),
      UserName: this.accountForm.value.CustomerName
    };

    if (this.isAddMode) {
      this.accountService.SaveBankAccount(bankaccount).subscribe(result => {
        if (result != null) {
          this.isSaved = true;
          this.SuccessMessage = "Saved Successfully!";
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.isSaved = false;
            this.router.navigateByUrl('/banking');
          }, 1500);
        }
      }, error => { this.errorMessage = error });
    }
    else {
      this.accountService.UpdateBankAccount(bankaccount);
      this.isSaved = true;
      this.SuccessMessage = "Updated Successfully!";
      setTimeout(() => {
        this.isSaved = false;
        this.router.navigateByUrl('/banking');
      }, 1500);
    }
  }

  getUserfullname(username: string) {

    var filteredUser = this.users.filter(user => { return user.UserName == username });

    if (filteredUser != null && filteredUser.length > 0) {
      return filteredUser[0].FirstName + ' ' + filteredUser[0].LastName;
    }
    return '';
  }

  onReset() {
    this.accountForm.reset();
  }

  onGoTo(){
    this.router.navigateByUrl('/banking');
  }
}
