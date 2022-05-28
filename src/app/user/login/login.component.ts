import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';

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
        sessionStorage.setItem("token",response.token);
        this.router.navigate(["/viewCompany"]);
      }
    })
  }

}
