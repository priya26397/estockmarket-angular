import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/service/company.service';
import { SectorService } from 'src/app/service/sector.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  stockExchange: string[] = ['Nse', 'Bse'];
  companyForm: FormGroup = new FormGroup({
    companyCode: new FormControl(null, Validators.required),
    companyName: new FormControl(null, Validators.required),
    ceo: new FormControl(null, Validators.required),
    companyTurnOver: new FormControl(null, [Validators.min(10000000)]),
    companyWebsite: new FormControl(null, Validators.required),
    stockExchangeName: new FormControl(null, Validators.required),
    sectorName: new FormControl(null, Validators.required),
  });
  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;
  sectors:any;
  constructor(private companyService:CompanyService,private snackbar:SnackbarService,private sectorService:SectorService) { }

  ngOnInit(): void {
    this.sectorService.getSector().subscribe((response:any)=>{
      this.sectors=response;
    })
  }

  onSubmit() {
    this.companyService.registerCompany(this.companyForm.value).subscribe((response)=>{
      if(response){
        this.snackbar.openSnackBar("Company added successfully","x");
        this.companyForm.reset();
        this.formDirective.resetForm();
      }
    })
  }



}
