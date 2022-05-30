import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url="http://localhost:6093";
  constructor(private httpClient: HttpClient ) { }

  registerStock(data:any){
    let token=sessionStorage.getItem('token');
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+token
      })
    }
    const regUrl="http://localhost:6092/api/v1.0/command/market/stock/add"
    return this.httpClient.post(regUrl, data,httpOptions);
  }

  aggregateStockById(code:string,sDate:any,eDate:any){
    const fetchStock=this.url+"/api/v1.0/query/market/stock/aggregate?companyCode="+code+"&startDate="+sDate+"&endDate="+eDate;
    return this.httpClient.get(fetchStock);
  }

  getStockByCompanyName(code:string,sDate:any,eDate:any){
    const fetchStock=this.url+"/api/v1.0/query/market/stock/get?companyCode="+code+"&startDate="+sDate+"&endDate="+eDate;
    return this.httpClient.get(fetchStock);
  }
}
