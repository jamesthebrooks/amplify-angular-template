import { Component, OnInit } from '@angular/core';
import {bladesImperial, bladesMetric} from "./bandsaw-blades.data";
import {IBandsawBlade} from "./bandsaw-blades.model";

@Component({
  selector: 'app-radius-limit',
  templateUrl: './radius-limit.page.html',
  styleUrls: ['./radius-limit.page.scss'],
  standalone: false,
})
export class RadiusLimitPage implements OnInit {
  public unit: 'in' | 'mm' = 'in'; // Default unit
  public bladeWidth: number | null = null; // Selected blade width
  public toothPitch: IBandsawBlade | null = null; // Selected tooth pitch
  public minimumCircleDiameter: number | null = null; // Calculated minimum circle diameter
  public minimumCircleRadius: number | null = null;
  public rationale: string;

  // Combined data for imperial
  public imperialData: IBandsawBlade[] = bladesImperial;

  // Combined data for metric
  public metricData: IBandsawBlade[] = bladesMetric;

  constructor() {}

  ngOnInit() {}

  calculateMinimumDiameter(): void {
    if (this.toothPitch && this.bladeWidth !== null) {
      const realWorldRadius = this.toothPitch.minDiameter;
      this.minimumCircleRadius = realWorldRadius;
      this.minimumCircleDiameter = realWorldRadius * 2;
      this.rationale = this.toothPitch.rationale;
    } else {
      this.minimumCircleDiameter = null;
      this.minimumCircleRadius = null;
      this.rationale = null;
    }
  }

  onUnitChange(): void {
    this.bladeWidth = null;
    this.toothPitch = null;
    this.minimumCircleDiameter = null;
    this.minimumCircleRadius = null;
  }

  onBladeWidthChange(width: number): void {
    this.bladeWidth = width;
    const filteredPitches = this.getFilteredToothPitchOptions();

    // Automatically select if only one pitch is available
    if (filteredPitches.length === 1) {
      this.onToothPitchChange(filteredPitches[0]);
    } else {
      this.toothPitch = null; // Clear selection if multiple options exist
    }

    this.minimumCircleDiameter = null;
    this.minimumCircleRadius = null;
  }

  getUniqueBladeWidths() {
    const data = this.unit === 'in' ? this.imperialData : this.metricData;
    return Array.from(new Set(data.map((item) => item.width))).sort((a, b) => a - b);
  }

  getFilteredToothPitchOptions() {
    const data = this.unit === 'in' ? this.imperialData : this.metricData;
    if (this.bladeWidth !== null) {
      return data.filter((item) => item.width === this.bladeWidth);
    }
    return [];
  }

  onToothPitchChange(pitch: { width: number; pitch: string; minDiameter: number }): void {
    this.toothPitch = pitch;
    this.calculateMinimumDiameter();
  }

  getBladeWidthDisplay(width: number): string {
    if (this.unit === 'in') {
      const fraction = this.imperialData.find((item) => item.width === width)?.fraction;
      return fraction ? `${fraction} (${width} inches)` : `${width} inches`;
    } else {
      return `${width} mm`;
    }
  }
}
