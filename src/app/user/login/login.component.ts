import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from "jwt-decode";
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLinear = true;
  isValid = false;
  invalidOtp = false;
  loginForm = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  otpValidationGroup = new FormGroup({
    otp:  new FormControl('', [Validators.required])
  })

  constructor(private userService:UserService,private snackbar:SnackbarService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.getUser(this.loginForm.value).subscribe((response:any)=>{
      console.log(response);
      if(response && response.token){
        this.snackbar.openSnackBar("User Logged in successfully","x");
        let decodeValue:any=jwt_decode(response.token)
        sessionStorage.setItem("token",response.token);
        sessionStorage.setItem("userName",decodeValue.sub);
        this.router.navigate(["/viewCompany"]);
        this.userService.setUserFlag(true);
      }
    })
  }

  generateOtp(){
    const email = this.loginForm.value.username;    
    this.userService.generateOtp(email).subscribe((response:any)=>{
  })
  }

  validateOtp() {
    const email = this.loginForm.value.username;
    const otpCode = this.otpValidationGroup.value.otp;    
    this.userService.validateOtp(email, otpCode).subscribe((response:any)=>{
     if(!response){
       this.isValid = false;
      this.invalidOtp = true;
      this.otpValidationGroup.reset();
     }else{
      this.isValid = true;
      this.invalidOtp = false;
     }     
  })
}


}
