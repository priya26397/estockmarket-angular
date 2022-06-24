import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockCompanyStock } from './company.service.spec';

import { SectorService } from './sector.service';

export const MockSector = {sectorName: 'Finanace', sectorDescription: 'Finance Department'};

describe('SectorService', () => {
  let service: SectorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SectorService]
    });
    service = TestBed.inject(SectorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new sector', () => {
    service.createSector('data').subscribe(resp => {
      expect(MockSector.sectorName).toEqual('Finance');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-command/api/v1.0/command/market/sector/create");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('delete sector', () => {
    service.deleteSector('id').subscribe(resp => {
      expect(service.deleteSector).toBeTruthy;
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-command/api/v1.0/command/market/sector/id");
    expect(req.request.method).toBe('DELETE');
    httpMock.verify();
  });
});
