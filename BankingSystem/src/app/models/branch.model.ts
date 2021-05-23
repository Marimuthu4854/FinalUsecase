export class Branch {
    public BranchID: Number;
    public BranchName: string;
    public IFSCCode: string;
    public MSIRCode: string;
    public State: string;
    public District: String;

    constructor(BranchID: number, BranchName: string, IFSCCode: string, MSIRCode: string, State: string, District: String) {
        this.BranchID = BranchID;
        this.BranchName = BranchName;
        this.IFSCCode = IFSCCode;
        this.MSIRCode = MSIRCode;
        this.State = State;
        this.District = District;
    }
}