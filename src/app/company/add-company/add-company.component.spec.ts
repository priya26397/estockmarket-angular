import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddCompanyComponent } from './add-company.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/service/company.service';
import { of } from 'rxjs';
import { SectorService } from 'src/app/service/sector.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const MockSector = [{
  sectorName: 'Finance',
  sectorDescription: 'Finance Department'
}]

describe('AddEditCompanyComponent', () => {
  let component: AddCompanyComponent;
  let fixture: ComponentFixture<AddCompanyComponent>;
  let service: CompanyService;
  let sectorService: SectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule,FormsModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule, MatInputModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CompanyService);
    sectorService = TestBed.inject(SectorService);   
    spyOn(sectorService, 'getSector').and.callFake(() => {
      return of(MockSector);
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  

  it('should call save() method on form submit', () => {
    fixture.detectChanges();
    spyOn(service, 'registerCompany').and.callFake(() => {
      return of('Company');
    });
    component.onSubmit();    
    expect(service.registerCompany).toHaveBeenCalled();
  }); 

});
