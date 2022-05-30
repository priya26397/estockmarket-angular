import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
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

}
