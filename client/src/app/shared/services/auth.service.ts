import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiEndpoint = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  loginState(): any {
    const params = new HttpParams().set('login_email', this.cookieService.get('login_email'));
    return this.http.get(`${this.apiEndpoint}/login_state`, { params: params } ).toPromise();
  }
}
