import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {toFractionalInch} from '../../shared/utils/math';
import {imperialTapDrillSizes, metricTapDrillSizes} from "./drill-bit.data";
import {IDrillBitTap} from "./drill-bit.model";

@Component({
  selector: 'app-drill-bit-calculator',
  templateUrl: './drill-bit-calculator.page.html',
  styleUrls: ['./drill-bit-calculator.page.scss'],
  standalone: false
})
export class DrillBitCalculatorPage implements OnInit {

  public imperialTapDrillSizes: IDrillBitTap[] = imperialTapDrillSizes;
  public metricTapDrillSizes: IDrillBitTap[] = metricTapDrillSizes;

  public toFractionalInch = toFractionalInch;

  selectedSystem: 'imperial' | 'metric' = 'imperial';
  selectedTapSize: string = '';
  result: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    const user = this.userService.user$.getValue();
    if (user && user.unitPreference) {
      this.selectedSystem = user.unitPreference; // Assume `unitPreference` is 'imperial' or 'metric'
    }
  }


  getFilteredTapSizes() {
    return this.selectedSystem === 'imperial' ? this.imperialTapDrillSizes : this.metricTapDrillSizes;
  }

  calculateDrillBitSize(): void {
    const sizes = this.getFilteredTapSizes();
    const match = sizes.find((item) => item.tapSize === this.selectedTapSize);
    if (match) {
      const size = match.drillSize;
      this.result = `Recommended drill size: ${size}`;
    } else {
      this.result = 'No matching drill size found for the selected tap size.';
    }
  }

  public resetValues = () => {
    this.selectedTapSize = null;
    this.result = null;
  }

}
