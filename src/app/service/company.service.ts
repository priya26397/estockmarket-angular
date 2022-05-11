import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url="http://localhost:3000";
  constructor(private httpClient: HttpClient ) { }

  registerCompany(data:any){
    const registerUrl=this.url+"/company";
    return this.httpClient.post(registerUrl, data);
  }

  getCompanyByCode(code:any){
    const fetchUser=this.url+"/company?code="+code;
    return this.httpClient.get(fetchUser);
  }

  getCompany(){
    const fetchUser=this.url+"/company";
    return this.httpClient.get(fetchUser);
  }
}
