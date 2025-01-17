import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrillBitCalculatorPage } from './drill-bit-calculator.page';

describe('DrillBitCalculatorPage', () => {
  let component: DrillBitCalculatorPage;
  let fixture: ComponentFixture<DrillBitCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillBitCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
