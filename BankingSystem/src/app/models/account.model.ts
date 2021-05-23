
export class BankAccount {
    public AccountID: Number;
    public CustomerName: string; //master
    public AccountNumber: number;
    public AccountType: string; //master
    public AccountCategory: string;
    public Balance:number;
    public BranchID:number; //master
    public Status:string;
    public CreatedDate: string;
    public CreatedBy: string;

    constructor(AccountID: number, CustomerName: string, AccountNumber: number, AccountType: string, AccountCategory: string,
        CreatedDate: string, CreatedBy: string, Balance:number,BranchID:number,Status:string) {
        this.AccountID = AccountID;
        this.CustomerName = CustomerName;
        this.AccountNumber = AccountNumber;
        this.AccountType = AccountType;
        this.AccountCategory = AccountCategory;
        this.Balance = Balance;
        this.BranchID = BranchID;
        this.Status = Status;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
    }
}