import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  loginState(): any {
    return this.http.get(`${this.apiEndpoint}/login_state`).toPromise();
  }
}
