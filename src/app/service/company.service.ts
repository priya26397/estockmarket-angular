import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url="http://localhost:6093";
  constructor(private httpClient: HttpClient ) { }

  registerCompany(data:any){
    let token=sessionStorage.getItem('token');
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+token
      })
    }
    const registerUrl="http://localhost:6092/api/v1.0/command/market/company/register";
    return this.httpClient.post(registerUrl, data,httpOptions);
  }

  getCompanyByCode(code:any){
    const fetchUser=this.url+"/api/v1.0/query/market/company/info/"+code;
    return this.httpClient.get(fetchUser);
  }

  getCompany(){
    const fetchUser=this.url+"/api/v1.0/query/market/company/getall";
    return this.httpClient.get(fetchUser);
  }

  getCompanyLatestStockPrice(code:any){
    const fetchUser=this.url+"/api/v1.0/query/market/company/view/"+code;
    return this.httpClient.get(fetchUser);
  }
}
