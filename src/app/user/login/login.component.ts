import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    emailId : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  constructor(private userService:UserService,private snackbar:SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.getUser(this.loginForm.value.emailId,this.loginForm.value.password).subscribe((response:any)=>{
      if(response.length>0){
        this.snackbar.openSnackBar("User Logged in successfully","x");
      }
    })
  }

}
