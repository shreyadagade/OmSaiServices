
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Role, RoleRequest } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  private readonly roleUrl = `${environment.apiBaseUrl}/api/Role`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Get All Roles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(
      this.roleUrl,
      { headers: this.getHeaders() }
    );
  }

  // Get Role By ID
  getRoleById(id: string): Observable<Role> {
    return this.http.get<Role>(
      `${this.roleUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // Create Role
  createRole(request: RoleRequest): Observable<Role> {
    return this.http.post<Role>(
      this.roleUrl,
      request,
      { headers: this.getHeaders() }
    );
  }

  // Update Role
  updateRole(id: string, request: RoleRequest): Observable<Role> {
    return this.http.put<Role>(
      `${this.roleUrl}/${id}`,
      request,
      { headers: this.getHeaders() }
    );
  }

  // Delete Role
  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.roleUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
