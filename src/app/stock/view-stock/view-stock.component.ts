import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/service/company.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css']
})
export class ViewStockComponent implements OnInit {

  viewStockForm!: FormGroup;
  companies:any;
  displayedColumns: string[] = ['companyName', 'price','date','time','actions'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource:any;
  showTable:boolean=false;
  stockAggregate:any;
  showAggregate:boolean=false;
  stockData:any;
  startDate:any;
  endDate:any;
   constructor(private companyService:CompanyService,private stockService:StockService,
    private datePipe:DatePipe,private snackbar:SnackbarService) { }

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
   
    this.refreshData();
  }

  toggleUpdate(data:any){
    data.edit = !data.edit;
  }

  update(data:any){
    console.log(data);    
    this.stockService.update(data).subscribe((response:any)=>{
      if(response){
        this.snackbar.openSnackBar("Stock updated successfully","x");
        this.refreshData();
      }
    })
  }

  delete(data:any){
    console.log(data);
    this.stockService.delete(data.id).subscribe((response:any)=>{
      if(response){
        this.snackbar.openSnackBar("Stock deleted successfully","x");
        this.refreshData();
      }
    })
  }

  refreshData(){
    this.startDate=this.datePipe.transform(this.viewStockForm.value.start, 'dd-MM-yyyy');
    this.endDate=this.datePipe.transform(this.viewStockForm.value.end, 'dd-MM-yyyy');
    this.stockService.getStockByCompanyName(this.viewStockForm.value.companyCode.companyCode,this.startDate,this.endDate).subscribe((response:any)=>{
      if(response!=null){
        this.showTable=true;
        this.stockData=response;
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.paginator = this.paginator;
      }
      
    })
    this.stockService.aggregateStockById(this.viewStockForm.value.companyCode.companyCode,this.startDate,this.endDate).subscribe((response:any)=>{
      if(response.length>0){
        this.showAggregate=true;
        this.stockAggregate=response[0];
      }
      
    })
  }
}
