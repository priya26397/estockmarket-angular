import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="http://localhost:6093";
  private userFlag=new BehaviorSubject<Boolean>(false);
  userFlagData=this.userFlag.asObservable();
  constructor(private httpClient: HttpClient ) { }

  registerUser(data:any){
    const registerUrl="http://localhost:6092/api/v1.0/command/user/register";
    return this.httpClient.post<any>(registerUrl,data,{observe:'response'}).pipe(res=>{
      return res;
    })
  }

  getUser(data:any){
    const val={
      "username":data.emailId,
      "password":data.password
    }
    const httpOptions={
      headers:new HttpHeaders({
        observe:'response',
        'Content-Type':'application/json',
        'Accept':'application/json'
      })
    }
    const fetchUser=this.url+"/api/v1.0/query/user/authenticate";
    return this.httpClient.post(fetchUser,data,httpOptions);
  }

  setUserFlag(value:Boolean){
    this.userFlag.next(value);
  }
}
