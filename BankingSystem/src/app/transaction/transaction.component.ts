import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms'
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  isTransactionSucceed:boolean = false;
  transactionForm!: FormGroup;
  isAddMode = false;

  constructor(private transactionService:TransactionService) { }

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      'TransactionType': new FormControl(null, Validators.required),
      'FromAccountNumber': new FormControl(null, Validators.required),
      'ToAccountNumber': new FormControl(null, Validators.required),
      'TransactionRemarks': new FormControl(null, Validators.required),
      'TransactionAmount': new FormControl(null, Validators.required),
      'TransactionStatus': new FormControl(null, Validators.required),
      'TransactionDate': new FormControl(null, Validators.required)
    });

  }

  onSubmit() {

    const transaction: Transaction = {
      TransactionType:this.transactionForm.value.TransactionType,
      TransactionID:0,
      FromAccountNumber:this.transactionForm.value.FromAccountNumber,
      ToAccountNumber:this.transactionForm.value.ToAccountNumber,
      TransactionRemarks:this.transactionForm.value.TransactionRemarks,
      TransactionAmount:this.transactionForm.value.TransactionAmount,
      TransactionStatus:this.transactionForm.value.TransactionStatus,
      TransactionDate:this.transactionForm.value.TransactionDate,
      CreatedDate: Date.now.toString(),
      CreatedBy: 'marimuthuk',
    };

    this.transactionService.SaveTransaction(transaction);
    this.isTransactionSucceed = true;
  }

  onReset(){
    this.transactionForm.reset();
  }
}
