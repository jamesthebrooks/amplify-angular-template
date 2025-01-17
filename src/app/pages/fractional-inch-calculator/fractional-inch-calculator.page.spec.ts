import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FractionalInchCalculatorPage } from './fractional-inch-calculator.page';

describe('FractionalInchCalculatorPage', () => {
  let component: FractionalInchCalculatorPage;
  let fixture: ComponentFixture<FractionalInchCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionalInchCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
