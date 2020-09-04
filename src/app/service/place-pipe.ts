import {Pipe, PipeTransform} from '@angular/core';
import {Place} from './place';

@Pipe({
  name: 'placePipe'
})
export class PlacePipe implements PipeTransform {
  transform(places: Place[], searchPlaceName: string = '', searchPlaceEmpty: boolean): Place[] {
    if (searchPlaceName.trim()) {
      places = places.filter(place => {
        if (place.name === null) {
          return false;
        }
        return place.name.indexOf(searchPlaceName.trim()) !== -1;
      });
    }
    if (searchPlaceEmpty === true) {
      places = places.filter(place => place.beaconsCount > 0);
    }
    return places;

  }
}
