import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public apiGet(path: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${path}`);
  }

  public postRequest<T>(path: string, body: T) {
    return this.httpClient.post(`${this.apiUrl}/${path}`, body);
  }
}
