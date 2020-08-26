import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../service/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getEs().subscribe(value => {
      this.users = value;
    });
  }

}
