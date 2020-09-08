import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Beacon {

  constructor(
    public id: number,
    public mac: string,
    public deviceId: number,
    public placeId: number) { }
}

@Injectable({
  providedIn: 'root'
})
export class BeaconService {

  public url = 'http://localhost:8080/api/beacon';
  public beacon: Beacon = null;
  public beacons: Beacon[] = null;

  constructor(private http: HttpClient) { }

  getE(id: string): Observable<Beacon> {
    return this.http.get<Beacon>(this.url + '/' + id).pipe(tap(x => this.beacon = x));
  }

  getEs(): Observable<Beacon[]> {
    return this.http.get<Beacon[]>(this.url).pipe(tap(x => this.beacons = x));
  }

  addOrUpdate(beacon: Beacon): Observable<Beacon> {
    return this.http.post<Beacon>(this.url + '/', beacon);
  }

  delete(id: number): Observable<Beacon> {
    return this.http.delete<Beacon>(this.url + '/' + id);
  }

  cloneBeacon(id: number): Beacon {
    if (id !== -1) {
      const findedBeacon = this.beacons.find(value => value.id === id);
      if (findedBeacon !== null) {
        return new Beacon(findedBeacon.id, findedBeacon.mac, findedBeacon.deviceId, findedBeacon.placeId);
      } else {
        return new Beacon(-1, null, null, null);
      }
    } else {
      return new Beacon(-1, null, null, null);
    }
  }
}
