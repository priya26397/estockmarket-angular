import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SectorService } from 'src/app/service/sector.service';

@Component({
  selector: 'app-view-sector',
  templateUrl: './view-sector.component.html',
  styleUrls: ['./view-sector.component.css']
})
export class ViewSectorComponent implements OnInit {
  dataSource: any;

  constructor(private sectorService:SectorService) { }
  displayedColumns: string[] = ['sectorName', 'sectorDescription'];
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.sectorService.getSector().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource<any>(response);
      this.dataSource.paginator = this.paginator;
    })
  }

}
