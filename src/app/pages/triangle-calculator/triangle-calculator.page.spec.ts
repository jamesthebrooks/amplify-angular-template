import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriangleCalculatorPage } from './triangle-calculator.page';

describe('TriangleCalculatorPage', () => {
  let component: TriangleCalculatorPage;
  let fixture: ComponentFixture<TriangleCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TriangleCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
