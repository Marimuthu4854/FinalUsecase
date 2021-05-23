export class User {
    public CustomerID: number;
    public FirstName: string;
    public LastName: string;
    public Gender: string;
    public DateOfBirth: Date;
    public EmailAddress: string;
    public Address: string;
    public Password: string;
    public State: string;
    public PinCode: string;
    public Nationality: string;

    constructor(FirstName: string, LastName: string, Gender: string, DateOfBirth: Date, EmailAddress: string,
        Address: string, Password: string, State: string, PinCode: string, Nationality: string, CustomerID: number) {
            this.CustomerID = CustomerID;
            this.FirstName = FirstName;
        this.LastName = LastName;
        this.Gender = Gender;
        this.DateOfBirth = DateOfBirth;
        this.EmailAddress = EmailAddress;
        this.Address = Address;
        this.Password = Password;
        this.State = State;
        this.PinCode = PinCode;
        this.Nationality = Nationality;
        
    }
}