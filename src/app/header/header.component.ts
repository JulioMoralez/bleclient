import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bstyle0 = 'btn btn-success my-2 my-sm-0 mx-1';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    this.authService.logout();
  }

}
