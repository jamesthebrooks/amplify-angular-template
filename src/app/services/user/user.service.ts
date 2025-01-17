import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAppUser } from './user.interfaces';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IAppUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
  }

  // Set the user object
  setUser(user: IAppUser): void {
    this.userSubject.next(user);
  }

  // Get the current user object
  getUser(): IAppUser | null {
    return this.userSubject.value;
  }

  // Clear the user object (e.g., log out)
  clearUser(): void {
    this.userSubject.next(null);
  }
}
