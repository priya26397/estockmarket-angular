import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url="http://localhost:3000/stock";
  constructor(private httpClient: HttpClient ) { }

  registerStock(data:any){
    return this.httpClient.post(this.url, data);
  }

  getStockById(id:any){
    const fetchStock=this.url+"?id="+id;
    return this.httpClient.get(fetchStock);
  }

  getStockByCompanyName(name:any){
    const fetchStock=this.url+"?companyName="+name;
    return this.httpClient.get(fetchStock);
  }
}
