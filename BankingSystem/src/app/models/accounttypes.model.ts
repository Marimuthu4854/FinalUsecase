export class AccountTypes {
    public AccountTypeID: Number;
    public AccountTypeName: string;
   

    constructor(AccountTypeID: number, AccountTypeName: string) {
        this.AccountTypeID = AccountTypeID;
        this.AccountTypeName = AccountTypeName;
    }
}