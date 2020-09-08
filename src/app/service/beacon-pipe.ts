import {Pipe, PipeTransform} from '@angular/core';
import {Beacon} from './beacon';
import {BaseService} from './base.service';

@Pipe({
  name: 'beaconPipe'
})
export class BeaconPipe implements PipeTransform {
  transform(beacons: Beacon[],
            searchMac: string = '',
            selectedPlaceId: number, searchBeaconEmpty: boolean,
            baseService: BaseService,
            searchDeviceNameForBeacon: string): Beacon[] {
    if ((selectedPlaceId === undefined) || (selectedPlaceId === null)) {
      // return null;
    } else {
      beacons = beacons.filter(beacon => beacon.placeId === selectedPlaceId);
    }
    if (searchBeaconEmpty === true) {
      beacons = beacons.filter(value => (value.placeId === null) || (baseService.placeMap.get(value.placeId) === undefined));
    }
    if ((searchDeviceNameForBeacon !== null) && (searchDeviceNameForBeacon.trim().length > 0)) {
      beacons = beacons.filter(value => (baseService.deviceMap.get(value.deviceId) !== undefined) &&
        (baseService.deviceMap.get(value.deviceId).name === searchDeviceNameForBeacon));
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
