import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string;
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    this.authService.authenticationService(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Успешный вход';
      this.errorMessage = '';
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      this.successMessage = '';
      this.errorMessage = 'Вход не удался';
    });
  }

}
