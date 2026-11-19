
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LogoutResponse } from '../models/logout-response.model';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private readonly logoutUrl =
    `${environment.apiBaseUrl}/api/auth/logout`;

  constructor(private http: HttpClient) {}

  logout(): Observable<LogoutResponse> {

    const token = sessionStorage.getItem('authToken');

    if (!token) {
      sessionStorage.clear();
      return of({ message: 'Session cleared.' });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<LogoutResponse>(
      this.logoutUrl,
      null,
      { headers }
    ).pipe(
      finalize(() => {
        // Clear local session whether API succeeds or fails
        sessionStorage.clear();
      })
    );
  }
}
