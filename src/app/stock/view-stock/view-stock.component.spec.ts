import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';
import { StockService } from 'src/app/service/stock.service';

import { ViewStockComponent } from './view-stock.component';

describe('ViewStockComponent', () => {
  let component: ViewStockComponent;
  let fixture: ComponentFixture<ViewStockComponent>;
  let stockService: StockService;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStockComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
      providers: [DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStockComponent);
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
    spyOn(stockService, 'getStockByCompanyName').and.callFake(() => {
      return of('Stock Details');
    });
    component.onSubmit();    
    expect(stockService.getStockByCompanyName).toHaveBeenCalled();
  });

  it('delete stock', () => {
    fixture.detectChanges();
    spyOn(stockService, 'delete').and.callFake(() => {
      return of('Stock Details');
    });
    component.delete(1);    
    expect(stockService.delete).toHaveBeenCalled();
  });

  it('update stock', () => {
    fixture.detectChanges();
    spyOn(stockService, 'update').and.callFake(() => {
      return of('Stock Details');
    });
    component.update('Stock');    
    expect(stockService.update).toHaveBeenCalled();
  });
});
