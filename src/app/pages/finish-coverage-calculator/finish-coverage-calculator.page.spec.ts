import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishCoverageCalculatorPage } from './finish-coverage-calculator.page';

describe('FinishCoverageCalculatorPage', () => {
  let component: FinishCoverageCalculatorPage;
  let fixture: ComponentFixture<FinishCoverageCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishCoverageCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
