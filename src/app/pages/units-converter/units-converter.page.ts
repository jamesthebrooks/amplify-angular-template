import { Component, OnInit } from '@angular/core';
import * as convert from 'convert-units';
import { SegmentChangeEventDetail } from "@ionic/angular";

type Unit =
  | 'nm' | 'mil'
  | 'mm' | 'cm' | 'm' | 'km'
  | 'in' | 'ft' | 'yd' | 'mi'
  | 'cm2' | 'm2' | 'km2' | 'ft2' | 'yd2' | 'mi2'
  | 'ml' | 'l' | 'm3' | 'in3' | 'ft3' | 'yd3' | 'gal'
  | 'g' | 'kg' | 't' | 'oz' | 'lb'
  | 'metric ton' | 'imperial ton'
  | 'cup' | 'qt' | 'pnt' | 'tsp' | 'tbsp'
  | 'm/s' | 'km/h' | 'mph' // mph included here
  | 'beard-second';

type InputValues = {
  value1: number | null;
  unit1: Unit | '';
  value2?: number | null;
  unit2?: Unit | '';
  value3?: number | null;
  unit3?: Unit | '';
  [key: string]: number | string | null | undefined;
};

@Component({
  selector: 'app-units-converter',
  templateUrl: './units-converter.page.html',
  styleUrls: ['./units-converter.page.scss'],
  standalone: false
})
export class UnitsConverterPage implements OnInit {

  conversionType: string = 'length';
  inputValues: InputValues = {
    value1: null,
    unit1: '',
    value2: null,
    unit2: '',
    value3: null,
    unit3: '',
  };
  resultUnit: Unit | '' = '';
  resultValue: number | null = null;

  availableUnits: Record<string, { metric: Unit[]; imperial: Unit[] }> = {
    length: { metric: ['nm', 'mil', 'mm', 'cm', 'm', 'km', 'beard-second'], imperial: ['in', 'ft', 'yd', 'mi'] },
    area: { metric: ['cm2', 'm2', 'km2'], imperial: ['ft2', 'yd2', 'mi2'] },
    liquidVolume: { metric: ['ml', 'l'], imperial: ['gal', 'cup', 'qt', 'pnt', 'tsp', 'tbsp'] },
    solidVolume: { metric: ['m3'], imperial: ['in3', 'ft3', 'yd3'] },
    weight: { metric: ['g', 'kg', 't'], imperial: ['oz', 'lb'] },
    speed: { metric: ['m/s', 'km/h'], imperial: ['mph'] },
    other: { metric: ['beard-second'], imperial: [] },
  };

  conversionLabels: Record<string, any> = {
    length: { value1: 'Length', unit1: 'From Unit', result: 'Converted Length' },
    area: { value1: 'Width', unit1: 'Width Unit', value2: 'Height', unit2: 'Height Unit', result: 'Converted Area' },
    liquidVolume: { value1: 'Volume', unit1: 'From Unit', result: 'Converted Liquid Volume' },
    solidVolume: { value1: 'Length', unit1: 'Length Unit', value2: 'Width', unit2: 'Width Unit', value3: 'Height', unit3: 'Height Unit', result: 'Converted Solid Volume' },
    weight: { value1: 'Weight', unit1: 'From Unit', result: 'Converted Weight' },
    speed: { value1: 'Speed', unit1: 'From Unit', result: 'Converted Speed' },
    other: { value1: 'Other', unit1: 'From Unit', result: 'Converted Value' },
  };

  constructor() {}

  ngOnInit() {}

  getResultInInches(): number | null {
    if (this.resultValue !== null && this.resultUnit) {
      try {
        return this.convertUnits(this.resultValue, this.resultUnit as Unit, 'in');
      } catch (error) {
        console.error(`Error converting to inches: ${(error as Error).message}`);
        return null;
      }
    }
    return null;
  }

  getInputUnits(inputKey: string): Unit[] {
    if (this.conversionType === 'area' || this.conversionType === 'solidVolume') {
      return this.availableUnits['length'].metric.concat(this.availableUnits['length'].imperial);
    }
    return this.availableUnits[this.conversionType]?.metric.concat(this.availableUnits[this.conversionType]?.imperial) || [];
  }

  updateValue(valueKey: string, event: any) {
    const value = event.detail?.value || null;
    this.inputValues[valueKey] = value ? parseFloat(value.trim()) : null;
    this.updateResult();
  }

  updateUnit(unitKey: string, event: any) {
    const unit = event.detail?.value || null;
    if (unit) {
      this.inputValues[unitKey] = unit.trim() as Unit;
    }
    this.updateResult();
  }

  updateResultUnit(event: any) {
    const unit = event.detail?.value || null;
    this.resultUnit = unit ? unit.trim() as Unit : '';
    this.updateResult();
  }

  updateResult() {
    if (!this.isInputComplete()) {
      this.resultValue = null;
      return;
    }

    try {
      if (this.requiresMultipleInputs()) {
        // Correctly calculate area or solid volume
        this.resultValue = this.convertUnitsWithMultipleInputs(
          this.inputValues.value1!,
          this.inputValues.unit1 as Unit,
          this.inputValues.value2!,
          this.inputValues.unit2 as Unit,
          this.inputValues.value3 || null,
          this.inputValues.unit3 as Unit || null,
          this.resultUnit as Unit, // Use the selected result unit
        );
      } else {
        // Standard single-input conversion
        this.resultValue = this.convertUnits(
          this.inputValues.value1!,
          this.inputValues.unit1 as Unit,
          this.resultUnit as Unit,
        );
      }
    } catch (e) {
      console.error((e as Error).message);
      this.resultValue = null;
    }
  }

  requiresMultipleInputs(): boolean {
    return ['area', 'solidVolume'].includes(this.conversionType);
  }

  isInputComplete(): boolean {
    if (!this.inputValues.value1 || !this.inputValues.unit1 || !this.resultUnit) {
      return false;
    }
    if (this.requiresMultipleInputs()) {
      if (this.conversionType === 'solidVolume' && (!this.inputValues.value2 || !this.inputValues.unit2 || !this.inputValues.value3 || !this.inputValues.unit3)) {
        return false;
      }
    }
    return true;
  }

  convertUnits(value: number, fromUnit: Unit, toUnit: Unit): number {
    // Custom handling for `mph` to other speed units
    if (fromUnit === 'mph') {
      if (toUnit === 'm/s') return value * 0.44704;
      if (toUnit === 'km/h') return value * 1.60934;
    } else if (toUnit === 'mph') {
      if (fromUnit === 'm/s') return value / 0.44704;
      if (fromUnit === 'km/h') return value / 1.60934;
    }

    // Use the convert-units library for supported conversions
    try {
      return convert(value).from(fromUnit as convert.Unit).to(toUnit as convert.Unit);
    } catch (error) {
      console.error(`Conversion from ${fromUnit} to ${toUnit} not supported.`);
      throw error;
    }
  }

  convertUnitsWithMultipleInputs(
    value1: number,
    unit1: Unit,
    value2: number,
    unit2: Unit,
    value3: number | null,
    unit3: Unit | null,
    toUnit: Unit,
  ): number {
    if (this.conversionType === 'area') {
      // Convert width and height to meters
      const width = convert(value1).from(unit1 as convert.Unit).to('m');
      const height = convert(value2).from(unit2 as convert.Unit).to('m');

      // Calculate the area in square meters
      const areaInSquareMeters = width * height;

      // Convert the result to the desired output unit
      return convert(areaInSquareMeters).from('m2').to(toUnit as convert.Unit);
    }

    if (this.conversionType === 'solidVolume') {
      // Convert length, width, and height to meters
      const length = convert(value1).from(unit1 as convert.Unit).to('m');
      const width = convert(value2).from(unit2 as convert.Unit).to('m');
      const height = value3 ? convert(value3).from(unit3! as convert.Unit).to('m') : 1;

      // Calculate the volume in cubic meters
      const volumeInCubicMeters = length * width * height;

      // Convert the result to the desired output unit
      return convert(volumeInCubicMeters).from('m3').to(toUnit as convert.Unit);
    }

    throw new Error(`Unsupported conversion type: ${this.conversionType}`);
  }

  setConversionType($event: CustomEvent<SegmentChangeEventDetail>) {
    this.clearAll();
    this.conversionType = $event.detail.value as string;
  }

  clearAll() {
    this.inputValues = { value1: null, unit1: '', value2: null, unit2: '', value3: null, unit3: '' };
    this.resultUnit = '';
    this.resultValue = null;
  }
}
