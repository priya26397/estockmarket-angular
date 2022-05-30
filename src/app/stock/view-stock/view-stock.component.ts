import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/service/company.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css']
})
export class ViewStockComponent implements OnInit {

  viewStockForm!: FormGroup;
  companies:any;
  displayedColumns: string[] = ['companyName', 'price','date','time'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource:any;
  showTable:boolean=false;
  stockAggregate:any;
  showAggregate:boolean=false;
   constructor(private companyService:CompanyService,private stockService:StockService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.viewStockForm = new FormGroup({
      companyCode:new FormControl('',Validators.required),
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
    });

    this.companyService.getCompany().subscribe((response: any) => {
      this.companies = response;
    })
  }

  onSubmit(){
    console.log(this.viewStockForm.value);
    const startDate=this.datePipe.transform(this.viewStockForm.value.start, 'dd-MM-yyyy');
    const endDate=this.datePipe.transform(this.viewStockForm.value.end, 'dd-MM-yyyy');
    this.stockService.getStockByCompanyName(this.viewStockForm.value.companyCode.companyCode,startDate,endDate).subscribe((response:any)=>{
      console.log(response);
      if(response!=null){
        this.showTable=true;
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.paginator = this.paginator;
      }
      
    })
    this.stockService.aggregateStockById(this.viewStockForm.value.companyCode.companyCode,startDate,endDate).subscribe((response:any)=>{
      console.log(response);
      if(response.length>0){
        this.showAggregate=true;
        this.stockAggregate=response[0];
      }
      
    })
  }
}
