import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url="http://localhost:6091";
  constructor(private httpClient: HttpClient ) { }

  registerStock(data:any){
    let token=sessionStorage.getItem('token');
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+token
      })
    }
    const regUrl= this.url+"/estockmarket-command/api/v1.0/command/market/stock/add"
    return this.httpClient.post(regUrl, data,httpOptions);
  }

  aggregateStockById(code:string,sDate:any,eDate:any){
    const fetchStock=this.url+"/estockmarket-query/api/v1.0/query/market/stock/aggregate?companyCode="+code+"&startDate="+sDate+"&endDate="+eDate;
    return this.httpClient.get(fetchStock);
  }

  getStockByCompanyName(code:string,sDate:any,eDate:any){
    const fetchStock=this.url+"/estockmarket-query/api/v1.0/query/market/stock/get?companyCode="+code+"&startDate="+sDate+"&endDate="+eDate;
    return this.httpClient.get(fetchStock);
  }

  update(data:any){
    let token=sessionStorage.getItem('token');
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+token
      })
    }
    const regUrl= "http://localhost:6091/estockmarket-command/api/v1.0/command/market/stock/update";
    return this.httpClient.post(regUrl,data,httpOptions);
  }

  delete(id:any){
    let token=sessionStorage.getItem('token');
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+token
      })
    }
    const regUrl=this.url+"/estockmarket-command/api/v1.0/command/market/stock/"+id;
    return this.httpClient.delete(regUrl,httpOptions);
  }
}
