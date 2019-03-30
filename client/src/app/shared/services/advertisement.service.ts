import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';
import { Advertisement } from '../models/advertisement';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getAdvertisements(): Observable<Array<Advertisement>> {
    return this.http.get<Array<Advertisement>>(`${this.apiEndpoint}/advertisements`);
  }
}
