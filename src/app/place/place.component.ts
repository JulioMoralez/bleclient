import {Component, OnInit} from '@angular/core';
import {Place, PlaceService} from '../service/place';
import {Beacon, BeaconService} from '../service/beacon';
import {BaseService, LOAD} from '../service/base.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {


  private load = LOAD.PLACE;

  selectedPlaceId: number = null;
  selectedBeaconId: number = null;
  selectedDeviceId: number = null;

  updatedName = '';
  searchMac = '';
  searchDeviceName = '';
  searchPlaceName = '';
  searchPlaceEmpty = false;
  searchDeviceEmpty = true;

  listStyle = 'list-group-item d-flex justify-content-between align-items-center';
  listStyleActive = 'list-group-item active d-flex justify-content-between align-items-center';


  constructor(public baseService: BaseService,
              private beaconService: BeaconService,
              private placeService: PlaceService) {
  }

  ngOnInit(): void {
    this.baseService.loadFromBase(this.load);
  }

  selectPlace(id: number): void {
    this.selectedPlaceId = id;
    this.selectedBeaconId = null;
    this.updatedName = this.baseService.placeMap.get(id).name;
    // this.beaconFilter = this.baseService.beacons.filter(value => value.placeId === id);
  }

  findDeviceName(idDevice: number): string {
    return idDevice ? this.baseService.deviceMap.get(idDevice).name : '#####';
  }

  updatePlace(id: number): void {
    const place = new Place(id, this.updatedName);
    this.placeService.addOrUpdate(place).subscribe(() => {
      this.baseService.loadFromBase(this.load);
    });
  }

  deletePlace(id: number): void {
    this.placeService.delete(id).subscribe(() => {
      this.selectedPlaceId = null;
      this.baseService.loadFromBase(this.load);
    });
  }

  selectBeacon(id: number): void {
    this.selectedBeaconId = id;
  }

  disableDevice(id: number): void {
    const bTmp = this.baseService.beacons.find(value => value.id === id);
    const beacon = new Beacon(bTmp.id, bTmp.mac, null, bTmp.placeId);
    this.beaconService.addOrUpdate(beacon).subscribe(() => {
      this.baseService.loadFromBase(this.load);
    });
  }
}
