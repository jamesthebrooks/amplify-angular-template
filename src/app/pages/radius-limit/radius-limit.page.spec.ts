import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadiusLimitPage } from './radius-limit.page';

describe('RadiusLimitPage', () => {
  let component: RadiusLimitPage;
  let fixture: ComponentFixture<RadiusLimitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiusLimitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
