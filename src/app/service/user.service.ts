import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="http://localhost:3000";
  constructor(private httpClient: HttpClient ) { }

  registerUser(data:any){
    const registerUrl=this.url+"/user";
    return this.httpClient.post(registerUrl, data);
  }

  getUser(email:any,password:any){
    const fetchUser=this.url+"/user?emailId="+email+"&password="+password;
    return this.httpClient.get(fetchUser);
  }
}
