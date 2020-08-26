import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../service/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  users: User[];
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  confirmReg = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getEs().subscribe(value => {
      this.users = value;
    });
  }

  register(): void {
      if (!(this.username.trim().length)) {
        this.errorMessage = 'Введите логин';
        return;
      }
      if (this.password.length < 3) {
        this.errorMessage = 'Пароль меньше трех символов';
        return;
      }
      if (this.password.trim() !== this.confirmPassword.trim()) {
        this.errorMessage = 'Пароли не совпадают';
        return;
      }
      this.userService.getEs().subscribe(value => {
        this.users = value;
        if (this.users.find(value1 => value1.username === this.username) !== undefined) {
          this.errorMessage = 'Пользователь существует';
          return;
        }
        this.errorMessage = null;
        const user: User = {id: null, username: this.username, password: this.password, role: 'USER', active: true};
        this.userService.createOrUpdate(user).subscribe(value1 => {
          if (value1.id !== null) {
            this.confirmReg = 'Регистрация успешна, ' + value1.username;
          }
        });
      });


  }

}
