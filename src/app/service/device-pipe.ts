import {Pipe, PipeTransform} from '@angular/core';
import {Device} from './device';
import {Beacon} from './beacon';
import validate = WebAssembly.validate;

@Pipe({
  name: 'devicePipe'
})
export class DevicePipe implements PipeTransform {
    transform(devices: Device[], searchName: string = '', searchDeviceEmpty: boolean, beacons: Beacon[]): Device[] {

    if (searchName.trim()) {
      devices = devices.filter(device => {
        if (device.name === null) {
          return false;
        }
        return device.name.indexOf(searchName.trim()) !== -1;
      });
    }
    if (searchDeviceEmpty === true) {
      const set: Set<number> = new Set<number>();
      beacons.forEach(value => {
        if (value.deviceId !== null) {
          set.add(value.deviceId);
        }
      });
      devices = devices.filter(value => !set.has(value.id));
    }
    return devices;
  }

}
