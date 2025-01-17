import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitsConverterPage } from './units-converter.page';

describe('UnitsConverterPage', () => {
  let component: UnitsConverterPage;
  let fixture: ComponentFixture<UnitsConverterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsConverterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
