import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as convert from 'convert-units';
import { Unit } from 'convert-units';
import { finishingOptions } from './finishes.data';
import { register } from 'swiper/element/bundle';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { IFinish } from './finishes.model';

//@ts-ignore
register({ Navigation, Pagination });

@Component({
  selector: 'app-finish-coverage-calculator',
  templateUrl: './finish-coverage-calculator.page.html',
  styleUrls: ['./finish-coverage-calculator.page.scss'],
  standalone: false,
})
export class FinishCoverageCalculatorPage implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;

  // Swiper configuration
  swiperConfig: SwiperOptions = {
    scrollbar: { el: '.swiper-scrollbar', draggable: true },
    height: 240,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    effect: 'cube',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 5,
      shadowScale: 0.65,
    },
    loop: true,
  };

  swiperInstance!: Swiper;

  finishes: IFinish[] = finishingOptions;
  selectedFinishIndex: number = 0;
  selectedFinish: IFinish = finishingOptions[0];
  length: number | null = null;
  lengthUnit: string = 'cm';
  width: number | null = null;
  widthUnit: string = 'cm';
  areaUnit: string = 'm2';
  volumeUnit: string = 'l';
  area: number | null = null;
  requiredFinishMin: number | null = null;
  requiredFinishMax: number | null = null;
  height: number | null = null; // Height input for volume calculation
  heightUnit: string = 'cm'; // Default unit for height
  isHeightRequired: boolean = false; // Flag to indicate if height is required

  dimensionUnits: string[] = ['cm', 'm', 'in', 'ft'];
  areaUnits: string[] = ['m2', 'cm2', 'in2', 'ft2'];
  volumeUnits: string[] = ['ml', 'l', 'gal', 'fl-oz', 'qt', 'pt'];

  firstChangeMade: boolean = false;

  constructor() {}

  ngOnInit() {
    if (this.finishes.length > 0) {
      this.selectedFinish = this.finishes[0];
    }
  }

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  initializeSwiper(): void {
    this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
      ...this.swiperConfig,
      on: { slideChange: () => this.handleSlideChange() },
    });
  }

  handleSlideChange(): void {
    if (this.swiperInstance) {
      this.selectedFinishIndex = this.swiperInstance.realIndex;
      this.selectedFinish = this.finishes[this.selectedFinishIndex];
      this.autoCalculate();
    }
  }

  setLength(event: Event) {
    const target = event.target as HTMLInputElement;
    this.length = target.value ? parseFloat(target.value.trim()) : null;
    if (!this.firstChangeMade) {
      this.widthUnit = this.lengthUnit;
      if (this.isHeightRequired) {
        this.heightUnit = this.lengthUnit;
      }
      this.firstChangeMade = true;
    }
    this.autoCalculate();
  }

  setWidth(event: Event) {
    const target = event.target as HTMLInputElement;
    this.width = target.value ? parseFloat(target.value.trim()) : null;
    if (!this.firstChangeMade) {
      this.lengthUnit = this.widthUnit;
      this.firstChangeMade = true;
    }
    this.autoCalculate();
  }

  setLengthUnit(value: string) {
    this.lengthUnit = value;
    if (!this.firstChangeMade) {
      if (this.isHeightRequired) {
        this.heightUnit = this.lengthUnit;
      }
      this.widthUnit = this.lengthUnit;
      this.firstChangeMade = true;
    }
    this.autoCalculate();
  }

  setWidthUnit(value: string) {
    this.widthUnit = value;
    if (!this.firstChangeMade) {
      if (this.isHeightRequired) {
        this.heightUnit = this.widthUnit;
      }
      this.lengthUnit = this.widthUnit;
      this.firstChangeMade = true;
    }
    this.autoCalculate();
  }

  setHeight(event: Event) {
    const target = event.target as HTMLInputElement;
    this.height = target.value ? parseFloat(target.value.trim()) : null;
    this.autoCalculate();
  }

  setHeightUnit(value: string) {
    this.heightUnit = value;
    if (!this.firstChangeMade) {
      this.widthUnit = this.heightUnit;
      this.lengthUnit = this.heightUnit;
      this.firstChangeMade = true;
    }
    this.autoCalculate();
  }

  setAreaUnit(value: string) {
    this.areaUnit = value;
    this.autoCalculate();
  }

  setVolumeUnit(value: string) {
    this.volumeUnit = value;
    this.autoCalculate();
  }

  autoCalculate() {
    if (this.selectedFinish.coverageType === 'volume') {
      this.isHeightRequired = true; // Indicate height-based calculation
      if (this.length && this.width && this.height && this.lengthUnit && this.widthUnit && this.heightUnit) {
        // Convert dimensions to meters
        //@ts-ignore
        const lengthInMeters = convert(this.length).from(this.lengthUnit as Unit).to('m');
        //@ts-ignore
        const widthInMeters = convert(this.width).from(this.widthUnit as Unit).to('m');
        //@ts-ignore
        const heightInMeters = convert(this.height).from(this.heightUnit as Unit).to('m');

        // Calculate the volume in cubic meters
        const volumeInCubicMeters = lengthInMeters * widthInMeters * heightInMeters;

        // Convert cubic meters to the selected volume unit
        //@ts-ignore
        this.requiredFinishMin = convert(volumeInCubicMeters).from('m3').to(this.volumeUnit as Unit);
        console.log(volumeInCubicMeters);

        this.requiredFinishMax = null; // Only one value is needed for volume
      } else {
        this.requiredFinishMin = null; // Reset if input is incomplete
      }
    } else {
      this.isHeightRequired = false; // Default behavior for other finishes
      if (this.length && this.width && this.lengthUnit && this.widthUnit && this.selectedFinish) {
        //@ts-ignore
        const lengthInMeters = convert(this.length).from(this.lengthUnit as Unit).to('m');
        //@ts-ignore
        const widthInMeters = convert(this.width).from(this.widthUnit as Unit).to('m');

        if (lengthInMeters !== null && widthInMeters !== null) {
          //@ts-ignore
          this.area = convert(lengthInMeters * widthInMeters).from('m2').to(this.areaUnit as Unit);

          if (this.selectedFinish.coverageMin) {
            const minCoverage = this.selectedFinish.coverageMin;
            this.requiredFinishMin = (this.area || 0) / minCoverage;
          } else {
            this.requiredFinishMin = null;
          }

          if (this.selectedFinish.coverageMax && this.selectedFinish.coverageMax > 0) {
            const maxCoverage = this.selectedFinish.coverageMax;
            this.requiredFinishMax = (this.area || 0) / maxCoverage;
          } else {
            this.requiredFinishMax = null;
          }

          if (
            this.requiredFinishMin !== null &&
            this.requiredFinishMax !== null &&
            this.requiredFinishMin > this.requiredFinishMax
          ) {
            const temp = this.requiredFinishMin;
            this.requiredFinishMin = this.requiredFinishMax;
            this.requiredFinishMax = temp;
          }
        }
      } else {
        this.area = null;
        this.requiredFinishMin = null;
        this.requiredFinishMax = null;
      }
    }
  }

  getSpecDataKeys(): string[] {
    return this.selectedFinish.specData ? Object.keys(this.selectedFinish.specData) : [];
  }
}
