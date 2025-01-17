import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-foot-calculator',
  templateUrl: './board-foot-calculator.page.html',
  styleUrls: ['./board-foot-calculator.page.scss'],
  standalone: false
})
export class BoardFootCalculatorPage implements OnInit {

  public length: number = null; // Length of the board in inches

  public width: number = null; // Width of the board in inches

  public thickness: number = null; // Thickness of the board in inches

  public pricePerBoardFoot: number = 0; // Price per board foot in USD

  public boardFeet: number = 0; // Total board feet

  public totalPrice: number = 0; // Total price

  constructor() {
  }

  ngOnInit() {
  }

  calculateBoardFeet(): void {
    // Calculate the board feet
    this.boardFeet = (this.length * this.width * this.thickness) / 144;

    // Calculate the total price
    this.totalPrice = this.boardFeet * this.pricePerBoardFoot;
  }

  clearPrice() {
    if (this.pricePerBoardFoot === 0) {
      this.pricePerBoardFoot = null;
    }
  }

  restorePrice() {
    if (this.pricePerBoardFoot === null || this.pricePerBoardFoot === undefined) {
      this.pricePerBoardFoot = 0;
    }
  }

}
