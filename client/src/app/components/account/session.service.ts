import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '@models/user';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiEndpoint}/login`, { user: user } );
  }
}
