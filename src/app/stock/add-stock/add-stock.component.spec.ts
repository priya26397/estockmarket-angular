import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';
import { StockService } from 'src/app/service/stock.service';

import { AddStockComponent } from './add-stock.component';

describe('AddStockComponent', () => {
  let component: AddStockComponent;
  let fixture: ComponentFixture<AddStockComponent>;
  let stockService: StockService;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStockComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule, MatSnackBarModule, MatSelectModule, MatInputModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockComponent);
    component = fixture.componentInstance;
    stockService = TestBed.inject(StockService);  
    companyService = TestBed.inject(CompanyService); 
    spyOn(companyService, 'getCompany').and.callFake(() => {
      return of([]);
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save stock during form submit', () => {
    fixture.detectChanges();
    spyOn(stockService, 'registerStock').and.callFake(() => {
      return of('Stock Details');
    });
    component.onSubmit();    
    expect(stockService.registerStock).toHaveBeenCalled();
  });
});
