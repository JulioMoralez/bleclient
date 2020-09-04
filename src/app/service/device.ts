import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Place} from "./place";
import {Beacon} from "./beacon";

@Injectable({
  providedIn: 'root'
})
export class Device {

  constructor(
    public id: number,
    public name: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public url = 'http://localhost:8080/api/device';
  public device: Device = null;
  public devices: Device[] = null;

  constructor(private http: HttpClient) { }

  getE(id: string): Observable<Device> {
    return this.http.get<Device>(this.url + '/' + id).pipe(tap(x => this.device = x));
  }

  getEs(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url).pipe(tap(x => this.devices = x));
  }

  addOrUpdate(device: Device): Observable<Device> {
    return this.http.post<Device>(this.url + '/', device);
  }

  delete(id: number): Observable<Device> {
    return this.http.delete<Device>(this.url + '/' + id);
  }
}
