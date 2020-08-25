import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user';
import {PlaceService} from '../service/place';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  username: string;
  password: string;
  userId: string;
  placeId: string;

  constructor(private userService: UserService, private placeService: PlaceService) { }

  ngOnInit(): void {
  }

  m(): void {
    console.log('111');
    this.userService.getEs().subscribe(value => console.log(value));
  }


  m2(): void {
    console.log(this.userId);
    this.userService.getE(this.userId).subscribe(value => console.log(value));
  }

  m3(): void {
    console.log(this.placeId);
    this.placeService.getE(this.placeId).subscribe(value => console.log(value));
  }
}
