import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FractionalInchCalculatorComponent } from './fractional-inch-calculator.component';

describe('FractionalInchCalculatorComponent', () => {
  let component: FractionalInchCalculatorComponent;
  let fixture: ComponentFixture<FractionalInchCalculatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionalInchCalculatorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FractionalInchCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
