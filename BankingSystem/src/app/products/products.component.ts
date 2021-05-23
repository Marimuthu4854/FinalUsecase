import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  titles=[];
  defaultTitle="";

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm){

  }

  onRegisterClick(){
    
  }
}
