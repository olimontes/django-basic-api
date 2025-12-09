import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = '/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/`);
  }

  getByNick(nick: string): Observable<User> {
    return this.http.get<User>(`${this.base}/user/${nick}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.base}/data/`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.base}/data/`, user);
  }

  delete(nickname: string): Observable<any> {
    return this.http.request('delete', `${this.base}/data/`, { body: { user_nickname: nickname } });
  }
}
