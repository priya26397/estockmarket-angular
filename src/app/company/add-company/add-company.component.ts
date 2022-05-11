import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/service/company.service';
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
    turnOver: new FormControl(null, [Validators.min(10000000)]),
    website: new FormControl(null, Validators.required),
    stockExchange: new FormControl()
  });
  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;
  constructor(private companyService:CompanyService,private snackbar:SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.companyService.registerCompany(this.companyForm.value).subscribe((response)=>{
      this.snackbar.openSnackBar("Company added successfully","x");
      this.companyForm.reset();
      this.formDirective.resetForm();
    })
  }



}
