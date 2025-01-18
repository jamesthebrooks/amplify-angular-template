import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getCurrentUser } from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  public readonly user$ = this.userSubject;

  constructor() {
    this.loadUser().then(); // Fetch user on service initialization
  }

  // Set user when logged in
  setUser(user: any): void {
    this.userSubject.next(user);
  }

  // Clear user when logged out
  clearUser(): void {
    this.userSubject.next(null);
  }

  // Load user from Amplify on app startup (for page refresh persistence)
  async loadUser(): Promise<void> {
    try {
      const user = await getCurrentUser();
      this.setUser(user);
      console.log('User loaded on refresh:', user);
    } catch (error) {
      console.log('No user found on refresh', error);
      this.clearUser();
    }
  }
}
