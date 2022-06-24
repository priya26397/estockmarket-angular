import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CompanyService } from 'src/app/service/company.service';

import { ViewCompanyComponent } from './view-company.component';

describe('ViewCompanyComponent', () => {
  let component: ViewCompanyComponent;
  let fixture: ComponentFixture<ViewCompanyComponent>;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompanyComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule, MatSnackBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyService);   
    spyOn(companyService, 'getCompany').and.callFake(() => {
      return of('Company List');
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete company', () => {
    fixture.detectChanges();
    spyOn(companyService, 'deleteCompany').and.callFake(() => {
      return of(true);
    });
    component.delete('1');    
    expect(companyService.deleteCompany).toHaveBeenCalled();
  });

 
});
