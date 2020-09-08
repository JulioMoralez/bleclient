import {Injectable} from '@angular/core';
import {Place, PlaceService} from './place';
import {Beacon, BeaconService} from './beacon';
import {Device, DeviceService} from './device';
import {Journal, JournalService} from './journal';

export enum LOAD {
  BASE, PLACE, JOURNAL
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  places: Place[] = [];
  beacons: Beacon[] = [];
  devices: Device[] = [];
  journals: Journal[] = [];

  selectedPlace: Place = null;

  beaconMap: Map<number, Beacon> = new Map<number, Beacon>();
  placeMap: Map<number, Place> = new Map<number, Place>();
  deviceMap: Map<number, Device> = new Map<number, Device>();

  constructor(private placeService: PlaceService,
              private beaconService: BeaconService,
              private deviceService: DeviceService,
              private journalService: JournalService) { }

  loadFromBase(load: LOAD): void {
    this.beaconService.getEs().subscribe(beacon => {
      this.beacons = beacon;
      this.placeService.getEs().subscribe(place => {
        this.places = place;
        this.deviceService.getEs().subscribe(device => {
          this.devices = device;
          this.mapNames();
          switch (load) {
            case LOAD.BASE: {
              break;
            }
            case LOAD.PLACE: {
              this.calcBeaconsCountInPlace();
              break;
            }
            case LOAD.JOURNAL: {
              this.journalService.getEs().subscribe(journal => {
                this.journals = journal;
                this.fillNamesJournal();
              });
              break;
            }
          }
        });
      });
    });
  }

  private mapNames(): void {
    this.beacons.forEach(value => this.beaconMap.set(value.id, value));
    this.places.forEach(value => this.placeMap.set(value.id, value));
    this.devices.forEach(value => this.deviceMap.set(value.id, value));
  }

  private fillNamesJournal(): void {
    this.journals.forEach(value => {
      value.beaconMac = this.beaconMap.get(value.beaconId).mac;
      value.placeName = this.placeMap.get(value.placeId).name;
      value.deviceName = this.deviceMap.get(value.deviceId).name;
    });
  }

  private calcBeaconsCountInPlace(): void {
    this.places.forEach(value => value.beaconsCount = 0);
    this.beacons.forEach(value => {
      if (value.placeId !== null) {
        if (this.placeMap.get(value.placeId) !== undefined) {
          this.placeMap.get(value.placeId).beaconsCount++;
        }
      }
    });
  }
}
