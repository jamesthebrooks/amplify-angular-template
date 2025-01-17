import { Component, OnInit, OnDestroy } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { environment } from '../../../environments/environment';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {NativeScreenOrientation} from "../../../global";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit, OnDestroy {

  public isBullseyeMode = true;
  public gamma = 0; // Left-right tilt (x-axis)
  public beta = 0; // Forward-back tilt (y-axis)
  public referenceAngle = 0; // Reference angle for linear level
  public isLocked = false;
  public motionAvailable = false;
  public bubblePositionX = 200; // Center for linear level
  public bubblePositionY = 100; // Center for bullseye level
  public bubbleShape = { rx: 15, ry: 15 };
  public isDevMode = environment.production === false;
  public reportedGamma: null | number = null;
  public reportedBeta: null | number = null;

  private motionListener: any;
  private dampingFactorBubble = 0.1;
  private dampingFactorLinear: number = 0.5;
  private debounceTimeText: number = 1000;
  private gammaSubject = new Subject<number>();
  private betaSubject = new Subject<number>();
  private subscriptions: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
    this.lockOrientation().then();
    this.checkAndRequestPermission().then();

    // Debounced updating of reported values
    this.subscriptions.add(
      this.gammaSubject.pipe(debounceTime(this.debounceTimeText)).subscribe((value) => {
        this.reportedGamma = value;
      }),
    );

    this.subscriptions.add(
      this.betaSubject.pipe(debounceTime(this.debounceTimeText)).subscribe((value) => {
        this.reportedBeta = value;
      }),
    );
  }

  ngOnDestroy() {
    if (this.motionListener) {
      this.motionListener.remove();
    }
    this.subscriptions.unsubscribe();
  }

  async lockOrientation() {
    try {
      if (Capacitor.isNativePlatform()) {
        await ScreenOrientation.lock({ orientation: 'portrait' });
        console.log('Orientation locked using Capacitor.');
      } else if ('orientation' in screen && typeof (screen.orientation as NativeScreenOrientation).lock === 'function') {
        (screen.orientation as NativeScreenOrientation).lock('portrait-primary').then(() => {
          console.log('Screen orientation locked to portrait');
        }).catch((error: any) => {
          console.error('Failed to lock screen orientation:', error);
        });
      } else {
        console.warn('Orientation lock not supported.');
      }
    } catch (error) {
      console.error('Failed to lock orientation:', error);
    }
  }

  async checkAndRequestPermission() {
    if (Capacitor.isNativePlatform() && typeof DeviceMotionEvent !== 'undefined') {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceMotionEvent as any).requestPermission();
          if (permission === 'granted') {
            this.startMotionTracking();
          } else {
            console.warn('Motion permission denied.');
            this.motionAvailable = false;
          }
        } catch (error) {
          console.error('Error requesting motion permission:', error);
          this.motionAvailable = false;
        }
      } else {
        this.startMotionTracking();
      }
    } else {
      this.startMotionTracking();
    }
  }

  startMotionTracking() {
    this.motionAvailable = true;
    this.motionListener = Motion.addListener('accel', (event) => {
      const accelX = event.accelerationIncludingGravity?.x || 0;
      const accelY = event.accelerationIncludingGravity?.y || 0;
      const accelZ = event.accelerationIncludingGravity?.z || 0;

      // Calculate gamma (x-axis tilt) and beta (y-axis tilt)
      const absoluteGamma = Math.atan2(accelX, Math.sqrt(accelY * accelY + accelZ * accelZ)) * (180 / Math.PI);
      const absoluteBeta = Math.atan2(accelY, Math.sqrt(accelX * accelX + accelZ * accelZ)) * (180 / Math.PI);

      // Adjust gamma and beta based on reference angle if locked
      this.gamma = this.isLocked ? absoluteGamma - this.referenceAngle : absoluteGamma;
      this.beta = absoluteBeta;

      // Emit values for debounced update
      this.gammaSubject.next(this.gamma);
      this.betaSubject.next(this.beta);

      if (!this.isBullseyeMode) {
        this.runLinear();
      } else {
        this.runBullsEye();
      }
    });
  }

  setReferenceAngle() {
    this.referenceAngle = this.gamma + this.referenceAngle; // Accumulate reference angle
    this.isLocked = true;
  }

  runLinear() {
    const rectX = 140;
    const rectWidth = 120;
    const rectY = 30;
    const rectHeight = 40;

    const bubbleDiameter = rectHeight; // Bubble size matches rectangle height
    const rectCenterX = rectX + rectWidth / 2;
    const rectCenterY = rectY + rectHeight / 2;

    // Determine orientation
    const isFaceUp = Math.abs(this.beta) < 30 && Math.abs(this.gamma) < 30;

    let newBubbleX = rectCenterX;
    let newBubbleY = rectCenterY;

    if (!isFaceUp) {
      // Portrait mode (facing user)
      const scaledGamma = Math.min(Math.max(this.gamma, -90), 90);
      const scaledBeta = Math.min(Math.max(this.beta, -90), 90);

      // Horizontal movement: Gamma controls left-right
      const horizontalDisplacement = (scaledGamma / 90) * (rectWidth / 2 - bubbleDiameter / 2);
      newBubbleX = rectCenterX + horizontalDisplacement;

      // Vertical movement: Gravity and buoyancy
      const verticalDisplacement = (scaledBeta / 90) * (rectHeight / 2 - bubbleDiameter / 2);
      newBubbleY = rectCenterY - verticalDisplacement;

      // Adjust bubble shape for edges and fast motion
      const atEdge = Math.abs(scaledGamma) === 90 || Math.abs(scaledBeta) === 90;
      if (atEdge) {
        this.bubbleShape.rx = bubbleDiameter / 2 / 1.5; // Squashed horizontally
        this.bubbleShape.ry = bubbleDiameter / 2 * 1.5; // Stretched vertically
      } else {
        this.bubbleShape = { rx: bubbleDiameter / 2, ry: bubbleDiameter / 2 }; // Reset shape
      }
    } else {
      // Face-up mode (lying flat)
      const scaledGamma = Math.min(Math.max(this.gamma, -90), 90);
      const scaledBeta = Math.min(Math.max(this.beta, -90), 90);

      // Horizontal movement: Gamma controls left-right
      const horizontalDisplacement = (scaledGamma / 90) * (rectWidth / 2 - bubbleDiameter / 2);
      newBubbleX = rectCenterX + horizontalDisplacement;

      // Vertical movement: Beta controls up-down
      const verticalDisplacement = (scaledBeta / 90) * (rectHeight / 2 - bubbleDiameter / 2);
      newBubbleY = rectCenterY - verticalDisplacement;

      // Adjust bubble shape dynamically for edges
      const atEdge = Math.abs(scaledGamma) === 90 || Math.abs(scaledBeta) === 90;
      if (atEdge) {
        this.bubbleShape.rx = bubbleDiameter / 2 / 1.5; // Squashed horizontally
        this.bubbleShape.ry = bubbleDiameter / 2 * 1.5; // Stretched vertically
      } else {
        this.bubbleShape = { rx: bubbleDiameter / 2, ry: bubbleDiameter / 2 }; // Reset shape
      }
    }

    // Smooth easing for motion
    this.bubblePositionX += (newBubbleX - this.bubblePositionX) * this.dampingFactorLinear;
    this.bubblePositionY += (newBubbleY - this.bubblePositionY) * this.dampingFactorLinear;

    // Constrain bubble within rectangle bounds
    this.bubblePositionX = Math.max(
      rectX + bubbleDiameter / 2,
      Math.min(rectX + rectWidth - bubbleDiameter / 2, this.bubblePositionX)
    );
    this.bubblePositionY = Math.max(
      rectY + bubbleDiameter / 2,
      Math.min(rectY + rectHeight - bubbleDiameter / 2, this.bubblePositionY)
    );

    // Adjust bubble shape based on velocity for fluid dynamics
    const velocityX = Math.abs(newBubbleX - this.bubblePositionX);
    const velocityY = Math.abs(newBubbleY - this.bubblePositionY);
    const stretchFactor = Math.min((velocityX + velocityY) / 5, 2); // Limit stretch
    this.bubbleShape = {
      rx: bubbleDiameter / 2 * (1 + stretchFactor),
      ry: bubbleDiameter / 2 / (1 + stretchFactor),
    };
  }

  runBullsEye() {
    const bubbleX = this.gamma * 20;
    const bubbleY = this.beta * -20;

    this.bubblePositionX += (100 + bubbleX - this.bubblePositionX) * this.dampingFactorBubble;
    this.bubblePositionY += (100 + bubbleY - this.bubblePositionY) * this.dampingFactorBubble;

    this.bubblePositionX = Math.max(20, Math.min(180, this.bubblePositionX));
    this.bubblePositionY = Math.max(20, Math.min(180, this.bubblePositionY));
  }

  unlockReferenceAngle() {
    this.referenceAngle = 0;
    this.isLocked = false;
  }

  toggleMode() {
    this.isBullseyeMode = !this.isBullseyeMode;
  }

}
