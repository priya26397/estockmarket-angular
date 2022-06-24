import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';

export const MockCompany = {companyName: 'CTS', comapnyCode: 'C-001'};
export const MockCompanyStock = {avg: '49', min: '25', max: '65'};

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be register new company', () => {
    service.registerCompany('data').subscribe(resp => {
      expect(MockCompany.comapnyCode).toEqual('C-001');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-command/api/v1.0/command/market/company/register");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('get company details through company code', () => {
    service.getCompanyByCode('code').subscribe(resp => {
      expect(MockCompany.companyName).toEqual('CTS');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-query/api/v1.0/query/market/company/info/code");
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

  it('get all company details', () => {
    service.getCompany().subscribe(resp => {
      expect(MockCompany.companyName).toEqual('CTS');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-query/api/v1.0/query/market/company/getall");
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

  it('get company latest stock price', () => {
    service.getCompanyLatestStockPrice('code').subscribe(resp => {
      expect(MockCompanyStock.min).toEqual('25');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-query/api/v1.0/query/market/company/view/code");
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

  it('delete company', () => {
    service.deleteCompany('code').subscribe(resp => {
      expect(service.deleteCompany).toBeTruthy;
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-command/api/v1.0/command/market/company/delete/code");
    expect(req.request.method).toBe('DELETE');
    httpMock.verify();
  });
});
