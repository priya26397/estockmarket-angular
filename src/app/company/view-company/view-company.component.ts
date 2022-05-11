import { AfterViewInit,Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CompanyService } from 'src/app/service/company.service';


@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  dataSource: any;

  constructor(private companyService:CompanyService) { }
  displayedColumns: string[] = ['companyCode', 'companyName', 'ceo','turnOver','website','stockExchange'];
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.companyService.getCompany().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource<any>(response);
      this.dataSource.paginator = this.paginator;
    })
    
  }

}
