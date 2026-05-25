import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private get storageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  saveToken(token: string) {
    if (this.storageAvailable) {
      localStorage.setItem('token', token);
    }
  }

  getToken() {
    return this.storageAvailable ? localStorage.getItem('token') : null;
  }

  clearToken() {
    if (this.storageAvailable) {
      localStorage.removeItem('token');
    }
  }
}
