import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SectorService } from 'src/app/service/sector.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-view-sector',
  templateUrl: './view-sector.component.html',
  styleUrls: ['./view-sector.component.css']
})
export class ViewSectorComponent implements OnInit {
  dataSource: any;

  constructor(private sectorService:SectorService,private snackbar:SnackbarService) { }
  displayedColumns: string[] = ['sectorName', 'sectorDescription','delete'];
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.refreshData();
  }
  refreshData(){
    this.sectorService.getSector().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource<any>(response);
      this.dataSource.paginator = this.paginator;
    })
  }

  delete(data:any){
    console.log(data);
    this.sectorService.deleteSector(data.id).subscribe((response:any)=>{
      if(response){
        this.snackbar.openSnackBar("Sector deleted successfully","x");
        this.refreshData();
      }
    })
  }


}
