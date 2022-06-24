import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SectorService } from 'src/app/service/sector.service';

import { ViewSectorComponent } from './view-sector.component';

describe('ViewSectorComponent', () => {
  let component: ViewSectorComponent;
  let fixture: ComponentFixture<ViewSectorComponent>;
  let sectorService: SectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSectorComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule, MatSnackBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSectorComponent);
    component = fixture.componentInstance;
    sectorService = TestBed.inject(SectorService);   
    spyOn(sectorService, 'getSector').and.callFake(() => {
      return of('Sector List');
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete sector', () => {
    fixture.detectChanges();
    spyOn(sectorService, 'deleteSector').and.callFake(() => {
      return of(true);
    });
    component.delete(1);    
    expect(sectorService.deleteSector).toHaveBeenCalled();
  });
});
