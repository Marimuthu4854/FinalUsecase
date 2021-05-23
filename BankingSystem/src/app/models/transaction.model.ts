export class Transaction {
    public TransactionID: Number;
    public TransactionType: string; //master
    public FromAccountNumber: number; //master
    public ToAccountNumber: number; //master
    public TransactionDate: string;
    public TransactionRemarks: string;
    public TransactionAmount:number;
    public TransactionStatus:number;
    public CreatedDate: string;
    public CreatedBy: string;

    constructor(TransactionID: Number,
        TransactionType: string,
        FromAccountNumber: number,
        ToAccountNumber: number,
        TransactionDate: string,
        TransactionRemarks: string,
        TransactionAmount:number,
        TransactionStatus:number,
        CreatedDate: string,
        CreatedBy: string) {
        this.TransactionID = TransactionID;
        this.TransactionType = TransactionType;
        this.FromAccountNumber = FromAccountNumber;
        this.ToAccountNumber = ToAccountNumber;
        this.TransactionDate = TransactionDate;
        this.TransactionRemarks = TransactionRemarks;
        this.TransactionAmount = TransactionAmount;
        this.TransactionStatus = TransactionStatus;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
    }
}