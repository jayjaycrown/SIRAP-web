import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { User } from '../users.model';

interface UserData {
  name: string;
  matric: string;
  passport: string;
  phone: number;
  expiryDate: Date;
  admission: Date;
  faculty: string;
  department: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  // tslint:disable-next-line: variable-name
  private _users = new BehaviorSubject<User[]>([]);

  get users() {
    return this._users.asObservable();
  }


  constructor(private http: HttpClient) { }

  fetchUsers() {
    return this.http
      .get<{ [key: string]: UserData }>(
        'https://edupass-d2cd1.firebaseio.com/users.json'
      )
      .pipe(
        map(resData => {
          const users = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              users.push(
                new User(
                  key,
                  resData[key].name,
                  resData[key].matric,
                  resData[key].passport,
                  resData[key].phone,
                  new Date(resData[key].expiryDate),
                  new Date(resData[key].admission),
                  resData[key].department,
                  resData[key].faculty
                )
              );
            }
          }
          return users;
          // return [];
        }),
        tap(users => {
          this._users.next(users);
        })
      );
  }

  getUser(id: string) {
    return this.http
      .get<UserData>(
        `https://edupass-d2cd1.firebaseio.com/users/${id}.json`
      )
      .pipe(
        map(userData => {
          return new User(
            id,
            userData.name,
            userData.matric,
            userData.passport,
            userData.phone,
            new Date(userData.expiryDate),
            new Date(userData.admission),
            userData.department,
            userData.faculty
          );
        })
      );
  }

  addUser(
    name: string,
    matric: string,
    phone: number,
    expiryDate: Date,
    admission: Date,
    faculty: string,
    department: string
  ) {
    let generatedId: string;
    const newUser = new User(
      Math.random().toString(),
      name,
      matric,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      phone,
      expiryDate,
      admission,
      faculty,
      department
    );
    return this.http
      .post<{ name: string }>(
        'https://edupass-d2cd1.firebaseio.com/users.json',
        {
          ...newUser,
          id: null
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.users;
        }),
        take(1),
        tap(users => {
          newUser.id = generatedId;
          this._users.next(users.concat(newUser));
        })
      );
  }


}
