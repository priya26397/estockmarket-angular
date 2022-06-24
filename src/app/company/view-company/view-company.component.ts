import { AfterViewInit,Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CompanyService } from 'src/app/service/company.service';
import { SnackbarService } from 'src/app/service/snackbar.service';


@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  dataSource: any;

  constructor(private companyService:CompanyService,private snackbar:SnackbarService) { }
  displayedColumns: string[] = ['companyCode', 'companyName', 'ceo','turnOver','website','stockExchange','sectorName','description','delete'];
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
  this.refreshData();
    
  }

  refreshData(){
    this.companyService.getCompany().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource<any>(response);
      this.dataSource.paginator = this.paginator;
    })
  }

  delete(data:any){
    this.companyService.deleteCompany(data.companyCode).subscribe((response:any)=>{
      if(response){
        this.snackbar.openSnackBar("Company deleted successfully","x");
        this.refreshData();
      }
    })
  }

}
