import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fractional-inch-calculator',
  templateUrl: './fractional-inch-calculator.component.html',
  styleUrls: ['./fractional-inch-calculator.component.scss'],
  standalone: false
})
export class FractionalInchCalculatorComponent implements OnInit, OnChanges {
  @Input() showInput: boolean = true; // Controls the visibility of the numeric input field
  @Input() inputValue: number | null = 0; // Input value for calculations
  @Output() result = new EventEmitter<{ wholeNumber: string; numerator: string; denominator: string }>();

  denominators: number[] = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]; // Available fractions
  selectedIndex: number = 0; // Default to 1/2
  calculationResult = {
    wholeNumber: '0',
    numerator: '0',
    denominator: '2',
  };

  constructor() {}

  ngOnInit() {
    this.updateFraction();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputValue'] || changes['selectedIndex']) {
      this.updateFraction();
    }
  }

  updateFraction() {
    if (this.inputValue === null || this.inputValue < 0) {
      this.calculationResult = { wholeNumber: '0', numerator: '0', denominator: '2' };
      this.result.emit({ ...this.calculationResult });
      return;
    }

    const decimalValue = parseFloat(this.inputValue.toString()) || 0; // Ensure value is a valid number
    const denominator = this.denominators[this.selectedIndex];
    const numerator = Math.round(decimalValue * denominator);
    const whole = Math.floor(numerator / denominator);
    const fractionalNumerator = numerator % denominator;

    this.calculationResult = {
      wholeNumber: whole.toString(),
      numerator: fractionalNumerator.toString(),
      denominator: denominator.toString(),
    };

    this.result.emit({ ...this.calculationResult });
  }

  clearInput() {
    if (this.inputValue === 0) {
      this.inputValue = null; // Clear the field if the value is zero
    }
  }

  restoreDefaultValue() {
    if (this.inputValue === null) {
      this.inputValue = 0; // Restore the default value when the field is blurred
    }
  }

  onRangeInput(event: any) {
    this.selectedIndex = event.detail.value; // Update the selected index dynamically
    this.updateFraction(); // Recalculate the fraction in real-time
  }

  onInputChange(event: any) {
    const value = event.target.value; // Get the input value
    this.inputValue = parseFloat(value) || 0; // Update inputValue, default to 0 if invalid
    this.updateFraction(); // Trigger calculation
  }
}
