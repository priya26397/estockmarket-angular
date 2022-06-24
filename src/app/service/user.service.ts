import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:6091";
  private userFlag = new BehaviorSubject<Boolean>(false);
  userFlagData = this.userFlag.asObservable();
  constructor(private httpClient: HttpClient) { }

  registerUser(data: any) {
    const registerUrl = this.url + "/estockmarket-command/api/v1.0/command/user/register";
    return this.httpClient.post<any>(registerUrl, data, { observe: 'response' }).pipe(res => {
      return res;
    })
  }

  getUser(data: any) {
    const val = {
      "username": data.emailId,
      "password": data.password
    }
    const httpOptions = {
      headers: new HttpHeaders({
        observe: 'response',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }
    const fetchUser = this.url + "/estockmarket-query/api/v1.0/query/user/authenticate";
    return this.httpClient.post(fetchUser, data, httpOptions).pipe(
      catchError((error) => {
        console.log('error is intercept');
        console.error(error.message);
        return throwError(error.message);
      })
    )
  }

  setUserFlag(value: Boolean) {
    this.userFlag.next(value);
  }

  generateOtp(email: string) {
    const otpCode = this.url + "/estockmarket-query/api/v1.0/query/user/generateOtp?email=" + email;
    return this.httpClient.get(otpCode, {responseType: 'text'}).pipe(
      catchError((error) => {
        console.log('error is intercept');
        console.error(error.message);
        return throwError(error.message);
      })
    )
  }

  validateOtp(email: string, otp: number): Observable<any> {
    const verifyCode = this.url + "/estockmarket-query/api/v1.0/query/user/validateOtp?email=" + email + "&otpnum=" + otp;
    return this.httpClient.get(verifyCode, {responseType: 'text'}).pipe(
      catchError(error => {
        console.log(error);
        return of(false);
      })
    )
  }
}
