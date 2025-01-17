import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  toggleDarkMode(isDark: boolean) {
    this.darkMode = isDark;
    document.body.classList.toggle('dark', isDark);
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
}
