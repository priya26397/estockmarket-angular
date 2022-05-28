import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName : new FormControl('', [Validators.required]),
    lastName : new FormControl('', [Validators.required]),
    userName : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    phone : new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
  }
    );
    @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  constructor(private userService:UserService,private snackbar:SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.registerUser(this.registerForm.value).subscribe((response)=>{
      this.registerForm.reset();
      this.formDirective.resetForm();
      this.snackbar.openSnackBar('User registered successfully', 'x');
    })
  }

}
