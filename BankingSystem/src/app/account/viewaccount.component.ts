import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BankAccountService } from '../services/account.service';
import { BankAccount } from '../models/account.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-account-view',
    templateUrl: './viewaccount.component.html'
})

export class ViewAccountComponent implements OnInit {
    accountForm!: FormGroup;
    users: User[] = [];
    accounts: BankAccount[] = [];
    selectUsername = '';
    errorMessage: string = '';

    constructor(private accountService: BankAccountService,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute) {

        this.userService.fetchAllUser().subscribe(result => {
            this.users = result;
        }, error => { this.errorMessage = error })
    }

    ngOnInit(): void {

        this.accountService.fetchBankAccountByNum(this.route.snapshot.params['AccNum']).subscribe(posts => {
            this.accounts.push(posts);
        }, error => { this.errorMessage = error });
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

    onGoTo() {
        this.router.navigateByUrl('/banking');
    }
}
