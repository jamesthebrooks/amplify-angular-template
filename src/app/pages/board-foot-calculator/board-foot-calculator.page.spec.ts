import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardFootCalculatorPage } from './board-foot-calculator.page';

describe('BoardFootCalculatorPage', () => {
  let component: BoardFootCalculatorPage;
  let fixture: ComponentFixture<BoardFootCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFootCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
