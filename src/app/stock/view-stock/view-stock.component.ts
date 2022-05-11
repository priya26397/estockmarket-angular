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
  displayedColumns: string[] = ['companyName', 'price'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource:any;
  showTable:boolean=false;
   constructor(private companyService:CompanyService,private stockService:StockService) { }

  ngOnInit(): void {
    this.viewStockForm = new FormGroup({
      companyName:new FormControl('',Validators.required),
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
    });

    this.companyService.getCompany().subscribe((response: any) => {
      this.companies = response;
    })
  }

  onSubmit(){
    console.log(this.viewStockForm.value);
    this.stockService.getStockByCompanyName(this.viewStockForm.value.companyName.companyName).subscribe((response:any)=>{
      console.log(response);
      if(response!=null){
        this.showTable=true;
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.paginator = this.paginator;
      }
      
    })
  }
}
