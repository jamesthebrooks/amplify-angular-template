export interface IAppUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  unitPreference: 'metric' | 'imperial';
  darkMode: boolean;
}