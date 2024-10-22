<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../../Services/AuthService/AuthGuard.service';
import { CommonModule } from '@angular/common';
=======
import { Component } from '@angular/core';

>>>>>>> d6fb30904f46226ea611ac1a710c0994afcb9bec
@Component({
  selector: 'app-user-login-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
<<<<<<< HEAD
export class UserLoginPageComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit() {
    this.isLoggedIn = this.authGuardService.isLoggedIn();
  }

  Logout(){
    this.authGuardService.logout();
    this.isLoggedIn = false;
  }
=======
export class UserLoginPageComponent {
>>>>>>> d6fb30904f46226ea611ac1a710c0994afcb9bec

}
