import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  public user: any;
  userChange: Observable<any>;
  userChangeObserver: Observer<any>;

  constructor() {
    this.userChange = new Observable((observer: Observer<any>) => {
      this.userChangeObserver = observer;
    });

    var data = localStorage.getItem('mws.user');
    if (data) {
      this.user = data;
    }
  }

  authenticate(): boolean {
    var data = localStorage.getItem('mws.user');
    if (data) {
      this.user = data;
      this.userChangeObserver.next(this.user);
      return true;
    }

    return false;
  }

  loadToken(): any {
    var data = localStorage.getItem('mws.token');
    if (data) {
      return data;
    }
  }

  loadUser(): any {
    var data = localStorage.getItem('mws.user');
    if (data) {
      this.user = data;
      return JSON.parse(data);
    }
  }

  save(user: any, token: string) {
    var data = JSON.stringify(user);
    localStorage.setItem('mws.token', token);
    localStorage.setItem('mws.user', data);
    this.user = data;
    this.userChangeObserver.next(this.user);
  }

  logout() {
    localStorage.removeItem('mws.token');
    localStorage.removeItem('mws.user');

    setTimeout(() => {
      this.user = {};
      this.userChangeObserver.next(this.user);
    }, 1000);
  }

}
