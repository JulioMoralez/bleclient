import { Component, OnInit } from '@angular/core';
import {Place, PlaceService} from '../service/place';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: Place[];

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeService.getEs().subscribe(value => {
      this.places = value;
    });
  }

}
