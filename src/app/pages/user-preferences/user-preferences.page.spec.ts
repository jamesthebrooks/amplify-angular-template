import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPreferencesPage } from './user-preferences.page';

describe('UserPreferencesPage', () => {
  let component: UserPreferencesPage;
  let fixture: ComponentFixture<UserPreferencesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreferencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
