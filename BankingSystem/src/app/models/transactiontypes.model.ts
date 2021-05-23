export class TrnasactionType {
    public TransactionTypeID: Number;
    public TransactionTypeName: string;

    constructor(TransactionTypeID: Number, TransactionTypeName: string) {
        this.TransactionTypeID = TransactionTypeID;
        this.TransactionTypeName = TransactionTypeName;
    }
}