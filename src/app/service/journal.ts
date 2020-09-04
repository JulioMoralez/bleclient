import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Journal {

  beaconMac = '';
  placeName = '';
  deviceName = '';

  constructor(
    public id: number,
    public dateTime: Date,
    public dB: number,
    public uUID: string,
    public beaconId: number,
    public placeId: number,
    public deviceId: number,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  public url = 'http://localhost:8080/api/journal';
  public journal: Journal = null;
  public journals: Journal[] = null;

  constructor(private http: HttpClient) { }

  getE(id: string): Observable<Journal> {
    return this.http.get<Journal>(this.url + '/' + id).pipe(tap(x => this.journal = x));
  }

  getEs(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.url).pipe(tap(x => this.journals = x));
  }

  addOrUpdate(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(this.url + '/', journal);
  }

  delete(id: number): Observable<Journal> {
    return this.http.delete<Journal>(this.url + '/' + id);
  }
}
