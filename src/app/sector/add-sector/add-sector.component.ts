import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { SectorService } from 'src/app/service/sector.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent implements OnInit {
  sectorForm: FormGroup = new FormGroup({
    sectorName: new FormControl(null, Validators.required),
    description:new FormControl(null, Validators.required),
  });
  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;
  constructor(private sectorService:SectorService,private snackbarService:SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.sectorService.createSector(this.sectorForm.value).subscribe((response:any)=>{
      console.log(response);
      if(response.status===200){
        this.snackbarService.openSnackBar("Sector Added succesfully","x")
        this.sectorForm.reset();
        this.formDirective.resetForm();
      }
    })
  }
}
