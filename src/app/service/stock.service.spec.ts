import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';

export const MockStock = {comapnyCode: 'C-001', stockPrice: '49'};


describe('StockServiceService', () => {
  let service: StockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockService]
    });
    service = TestBed.inject(StockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be register new stock', () => {
    service.registerStock('data').subscribe(resp => {
      expect(MockStock.comapnyCode).toEqual('C-001');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-command/api/v1.0/command/market/stock/add");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('aggregate by stockId', () => {
    service.aggregateStockById('code','start','end').subscribe(resp => {
      expect(MockStock.stockPrice).toEqual('49');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-query/api/v1.0/query/market/stock/aggregate?companyCode=code&startDate=start&endDate=end");
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

  it('get stock by company name', () => {
    service.getStockByCompanyName('code','start','end').subscribe(resp => {
      expect(MockStock.stockPrice).toEqual('49');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-query/api/v1.0/query/market/stock/get?companyCode=code&startDate=start&endDate=end");
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

  it('update stock', () => {
    service.update('data').subscribe(resp => {
      expect(MockStock.comapnyCode).toEqual('C-001');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-command/api/v1.0/command/market/stock/update");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('delete stock', () => {
    service.delete('id').subscribe(resp => {
      expect(service.delete).toBeTruthy;
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-command/api/v1.0/command/market/stock/id");
    expect(req.request.method).toBe('DELETE');
    httpMock.verify();
  });
});
