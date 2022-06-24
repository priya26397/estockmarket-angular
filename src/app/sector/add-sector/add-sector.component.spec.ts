import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SectorService } from 'src/app/service/sector.service';

import { AddSectorComponent } from './add-sector.component';

describe('AddSectorComponent', () => {
  let component: AddSectorComponent;
  let fixture: ComponentFixture<AddSectorComponent>;
  let sectorService: SectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSectorComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule, MatSnackBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectorComponent);
    component = fixture.componentInstance;
    sectorService = TestBed.inject(SectorService);       
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add sector during form submit', () => {
    fixture.detectChanges;
    spyOn(sectorService, 'createSector').and.callFake(() => {
      return of('Sector List');
    });
    component.onSubmit();    
    expect(sectorService.createSector).toHaveBeenCalled;
  });

});
