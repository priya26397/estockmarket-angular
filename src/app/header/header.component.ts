import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogin: Boolean = false;
  username: any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userFlagData.subscribe((response) => {
      this.username = sessionStorage.getItem('userName');
      if (this.username) {
        this.userLogin = true;
      } else {
        this.userLogin = false;
      }
    })
  }


  redirect() {
    this.router.navigate(['/login']);
    sessionStorage.clear();
    this.userLogin = false;
    this.userService.setUserFlag(false);
  }
}
