import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class Place {

  constructor(
    public id: number,
    public name: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  public url = 'http://localhost:8080/api/place';
  public place: Place = null;
  public places: Place[] = null;

  constructor(private http: HttpClient) { }

  getE(id: string): Observable<Place> {
    return this.http.get<Place>(this.url + '/' + id).pipe(tap(x => this.place = x));
  }

  getEs(): Observable<Place[]> {
    return this.http.get<Place[]>(this.url).pipe(tap(x => this.places = x));
  }
}
