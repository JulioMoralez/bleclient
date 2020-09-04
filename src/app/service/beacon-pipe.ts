import {Pipe, PipeTransform} from '@angular/core';
import {Beacon} from './beacon';

@Pipe({
  name: 'beaconPipe'
})
export class BeaconPipe implements PipeTransform {
  transform(beacons: Beacon[], searchMac: string = '', selectedPlaceId: number): Beacon[] {
    if ((selectedPlaceId === undefined) || (selectedPlaceId === null)) {
      return null;
    } else {
      beacons = beacons.filter(beacon => beacon.placeId === selectedPlaceId);
    }
    if (searchMac.trim()) {
      beacons = beacons.filter(beacon => {
        if (beacon.mac === null) {
          return false;
        }
        return beacon.mac.indexOf(searchMac.trim()) !== -1;
      });
    }
    return beacons;
  }

}
