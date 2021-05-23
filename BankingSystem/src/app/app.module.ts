import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountComponent } from './account/account.component';
import { AccounttypeComponent } from './accounttype/accounttype.component';
import { BranchComponent } from './branch/branch.component';
import { TransactiontypeComponent } from './transactiontype/transactiontype.component';
import { BankingComponent } from './banking/banking.component';
import { BankAccountService } from './services/account.service';
import { TransactionService } from './services/transaction.service';
import { StatementComponent } from './statement/statement.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UUnauthorizedComponent } from './u-unauthorized/u-unauthorized.component';
import { AuthService } from './services/auth.service';
import { AuthGuard} from './services/auth-guard.service';

const appRoutes: Routes = [{
  path: '',
  component: LoginComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegistrationComponent
},
{
  path: 'user',
  component: UserComponent,
  canActivate: [AuthGuard]
},
{
  path:'unauthorized',
  component:UUnauthorizedComponent
},
{
  path: 'statement',
  component: StatementComponent,
  canActivate: [AuthGuard]
},
{
  path: 'banking',
  component: BankingComponent  ,
  canActivate: [AuthGuard],
  children: [
    { path: ':id', component: StatementComponent,canActivate: [AuthGuard] }]
},
{
  path: 'transaction',
  component: TransactionComponent,
  canActivate: [AuthGuard]
},
{
  path: 'account',
  component: AccountComponent,
  canActivate: [AuthGuard]
},
{
  path: 'branch',
  component: BranchComponent,
  canActivate: [AuthGuard]
},
{
  path: 'accounttypes',
  component: AccounttypeComponent,
  canActivate: [AuthGuard]
},
{
  path: 'transactiontypes',
  component: TransactiontypeComponent,
  canActivate: [AuthGuard]
},
{
  path: '**',
  component: PagenotfoundComponent
}

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProductsComponent,
    HeaderComponent,
    UserComponent,
    TransactionComponent,
    AccountComponent,
    AccounttypeComponent,
    BranchComponent,
    TransactiontypeComponent,
    BankingComponent,
    StatementComponent,
    PagenotfoundComponent,
    UUnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, BankAccountService, TransactionService, AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
