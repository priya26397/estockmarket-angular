import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/service/company.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stockForm: FormGroup = new FormGroup({
    companyCode: new FormControl(null, Validators.required),
    price:new FormControl(null, [Validators.required, Validators.pattern('^(0|[1-9]\\d*)?(\\.\\d+)?(?<=\\d)$')]),
  });
  companies: any;
  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;
  constructor(private companyService: CompanyService,private stockService:StockService,private snackbar:SnackbarService) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe((response: any) => {
      this.companies = response;
    })
  }

  onSubmit(){
    const stock={
      companyCode:this.stockForm.value.companyCode,
      price:this.stockForm.value.price
    }
    this.stockService.registerStock(stock).subscribe((response:any)=>{
      if(response){
        this.snackbar.openSnackBar("Stocks added successfully","x");
        this.stockForm.reset();
        this.formDirective.resetForm();
      }
    })
  }
}
