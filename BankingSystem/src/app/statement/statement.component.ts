import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as XLSX  from 'xlsx';
import { ElementRef, ViewChild } from '@angular/core';  
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {
title:string ='';
mode:string = '';
transactions:Transaction[]=[];

@ViewChild('TABLE', { static: false }) TABLE!: ElementRef;
  constructor(private route:ActivatedRoute, private transactionService:TransactionService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.title = Number(this.route.snapshot.params['id']) == 1 ? 'Mini Statement': 'Detailed Statement';
    this.mode = Number(this.route.snapshot.params['id']) == 1 ? 'MINI': 'DETAIL';
    this.transactionService.fetchTransaction(this.mode).subscribe(records =>{
      this.transactions = records;
    });
  }

  ExportTOExcel() {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');  
    XLSX.writeFile(workbook, 'Statement.xlsx');  
  }
}
