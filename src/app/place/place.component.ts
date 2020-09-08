import {Component, OnInit} from '@angular/core';
import {Place, PlaceService} from '../service/place';
import {Beacon, BeaconService} from '../service/beacon';
import {BaseService, LOAD} from '../service/base.service';
import {Device, DeviceService} from '../service/device';
import {Message, OperService} from '../service/oper';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  buttonStylePrimary = 'btn btn-primary mx-2';
  buttonStyleSuccess = 'btn btn-success mx-2';
  buttonStyleWarning = 'btn btn-warning mx-2';

  private load = LOAD.PLACE;

  selectedPlaceId: number = null;
  selectedBeaconId: number = null;
  selectedDeviceId: number = null;

  updatedNamePlace = '';
  updatedNameBeacon = '';
  updatedNameDevice = '';
  searchMac = '';
  searchDeviceName = '';
  searchDeviceNameForBeacon = '';
  searchPlaceName = '';
  searchPlaceEmpty = false;
  searchBeaconEmpty = false;
  searchDeviceEmpty = true;

  connectingPlace = false;
  connectingDevice = false;

  connectedPlace: number = null;
  connectedDevice: number = null;

  listStyle = 'list-group-item d-flex justify-content-between align-items-center';
  listStyleActive = 'list-group-item active d-flex justify-content-between align-items-center';


  constructor(public baseService: BaseService,
              private beaconService: BeaconService,
              private placeService: PlaceService,
              private deviceService: DeviceService,
              private operService: OperService) {
  }

  ngOnInit(): void {
    this.baseService.loadFromBase(this.load);
  }

  selectPlace(id: number): void {
    if (this.connectingPlace) {
      this.connectedPlace = id;
    } else {
      if (this.selectedPlaceId === id) {
        this.selectedPlaceId = null;
        this.updatedNamePlace = null;
      } else {
        this.selectedPlaceId = id;
        this.selectedBeaconId = null;
        this.updatedNamePlace = this.baseService.placeMap.get(id).name;
      }
    }
  }

  findPlaceName(beacon: Beacon, id: number): string {
    if (beacon === null) {
      beacon = this.baseService.beacons.find(value => value.id === id);
    }
    if (beacon !== undefined) {
      return this.baseService.placeMap.get(beacon.placeId) !== undefined ?
        this.baseService.placeMap.get(beacon.placeId).name : '#########';
    } else {
      return '#########';
    }
  }

  findDeviceName(beacon: Beacon, id: number): string {
    if (beacon === null) {
      beacon = this.baseService.beacons.find(value => value.id === id);
    }
    if (beacon !== undefined) {
      return this.baseService.deviceMap.get(beacon.deviceId) !== undefined ?
        this.baseService.deviceMap.get(beacon.deviceId).name : '##########';
    } else {
      return '##########';
    }
  }

  updatePlace(id: number): void {
    if ((this.updatedNamePlace !== null) && (this.updatedNamePlace.trim().length !== 0)) {
      const place = new Place(id, this.updatedNamePlace);
      this.placeService.addOrUpdate(place).subscribe(value => {
        this.baseService.loadFromBase(this.load);
        if (value.id === id) {
          this.operService.setMessage(Message.PLACE_UPDATE_SUCCESS);
        } else {
          this.operService.setMessage(Message.PLACE_ADD_SUCCESS);
        }
      });
    } else {
      this.operService.setMessage(Message.PLACE_EMPTY_NAME_WARNING);
    }
  }

  deletePlace(id: number): void {
    if (id !== null) {
      this.placeService.delete(id).subscribe(() => {
        this.selectedPlaceId = null;
        this.updatedNamePlace = null;
        this.baseService.loadFromBase(this.load);
        this.operService.setMessage(Message.PLACE_DELETE_SUCCESS);
      });
    } else {
      this.operService.setMessage(Message.PLACE_EMPTY_WARNING);
    }
  }

  selectBeacon(id: number): void {
    this.connectingDevice = false;
    this.connectingPlace = false;
    if (this.selectedBeaconId === id) {
      this.selectedBeaconId = null;
      this.updatedNameBeacon = null;
    } else {
      this.selectedBeaconId = id;
      this.updatedNameBeacon = this.baseService.beaconMap.get(id).mac;
      this.connectedDevice = this.baseService.beaconMap.get(id).deviceId;
      this.connectedPlace = this.baseService.beaconMap.get(id).placeId;
    }
  }

  updateBeacon(id: number): void {
    if ((this.updatedNameBeacon !== null) && (this.updatedNameBeacon.trim().length !== 0)) {
      const beacon = this.beaconService.cloneBeacon(id);
      beacon.mac = this.updatedNameBeacon;
      beacon.placeId = this.connectedPlace;
      beacon.deviceId = this.connectedDevice;
      this.beaconService.addOrUpdate(beacon).subscribe(value => {
        this.baseService.loadFromBase(this.load);
        if (value.id === id) {
          this.operService.setMessage(Message.BEACON_UPDATE_SUCCESS);
        } else {
          this.operService.setMessage(Message.BEACON_ADD_SUCCESS);
        }
        this.connectedPlace = null;
        this.connectedDevice = null;
        this.connectingPlace = false;
        this.connectingDevice = false;
      });
    } else {
      this.operService.setMessage(Message.BEACON_EMPTY_NAME_WARNING);
    }
  }

  deleteBeacon(id: number): void {
    if (id !== null) {
      this.beaconService.delete(id).subscribe(() => {
        this.selectedBeaconId = null;
        this.updatedNameBeacon = null;
        this.baseService.loadFromBase(this.load);
        this.operService.setMessage(Message.BEACON_DELETE_SUCCESS);
        this.connectedPlace = null;
        this.connectedDevice = null;
        this.connectingPlace = false;
        this.connectingDevice = false;
      });
    } else {
      this.operService.setMessage(Message.BEACON_EMPTY_WARNING);
    }
  }

  selectDevice(id: number): void {
    if (this.connectingDevice) {
      if ((this.baseService.beacons.filter(value => value.deviceId === id).length === 0) ||
        (this.baseService.beacons.find(value => value.id === this.selectedBeaconId).deviceId === id)) {
        this.connectedDevice = id;
        this.operService.setMessage(Message.DEVICE_CONNECT_SUCCESS);
      } else {
        this.operService.setMessage(Message.DEVICE_CONNECT_WARNING);
      }
    } else {
      if (this.selectedDeviceId === id) {
        this.selectedDeviceId = null;
        this.updatedNameDevice = null;
      } else {
        this.selectedDeviceId = id;
        this.updatedNameDevice = this.baseService.deviceMap.get(id).name;
      }
    }

  }

  updateDevice(id: number): void {
    if ((this.updatedNameDevice !== null) && (this.updatedNameDevice.trim().length !== 0)) {
        const device = new Device(id, this.updatedNameDevice);
        this.deviceService.addOrUpdate(device).subscribe(value => {
          this.baseService.loadFromBase(this.load);
          if (value.id === id) {
            this.operService.setMessage(Message.DEVICE_UPDATE_SUCCESS);
          } else {
            this.operService.setMessage(Message.DEVICE_ADD_SUCCESS);
          }
        });
    } else {
      this.operService.setMessage(Message.DEVICE_EMPTY_NAME_WARNING);
    }

  }

  deleteDevice(id: number): void {
    if (id !== null) {
      this.deviceService.delete(id).subscribe(() => {
        this.selectedDeviceId = null;
        this.updatedNameDevice = null;
        this.baseService.loadFromBase(this.load);
        this.operService.setMessage(Message.DEVICE_DELETE_SUCCESS);
      });
    } else {
      this.operService.setMessage(Message.DEVICE_EMPTY_WARNING);
    }

  }

  connectPlace(): void {
    this.connectingPlace = !this.connectingPlace;
  }

  connectDevice(): void {
    this.connectingDevice = !this.connectingDevice;
  }

  deleteConnectedPlace(): void {
    this.connectedPlace = null;
    this.operService.setMessage(Message.PLACE_DISCONNECT_SUCCESS);
  }

  deleteConnectedDevice(): void {
    this.connectedDevice = null;
    this.operService.setMessage(Message.DEVICE_DISCONNECT_SUCCESS);
  }
}
