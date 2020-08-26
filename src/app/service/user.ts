import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(
    public id: number,
    public username: string,
    public password: string,
    public role: string,
    public active: boolean) { }
}

export interface UserAuth {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = 'http://localhost:8080/api/user';
  public user: User = null;
  public users: User[] = null;

  constructor(private http: HttpClient) { }

  getE(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id).pipe(tap(x => this.user = x));
  }

  getEs(): Observable<User[]> {
    console.log(2);
    return this.http.get<User[]>(this.url).pipe(tap(x => this.users = x));
  }

  createOrUpdate(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/', user);
  }
}

