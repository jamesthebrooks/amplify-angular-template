import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

interface TriangleInput {
  value: number | null;
  type: 'side' | 'angle';
}

@Component({
  selector: 'app-triangle-calculator',
  templateUrl: './triangle-calculator.page.html',
  styleUrls: ['./triangle-calculator.page.scss'],
  standalone: false,
})
export class TriangleCalculatorPage {
  @ViewChild('triangleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  inputs: TriangleInput[] = [
    { value: null, type: 'side' },
    { value: null, type: 'angle' },
    { value: null, type: 'side' },
  ];

  mode: 'side-angle-side' | 'angle-side-angle' = 'side-angle-side';
  errorMessage: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleMode() {
    this.mode = this.mode === 'side-angle-side' ? 'angle-side-angle' : 'side-angle-side';

    // Update the inputs based on the selected mode
    this.inputs = this.mode === 'side-angle-side'
      ? [
        { value: null, type: 'side' },
        { value: null, type: 'angle' },
        { value: null, type: 'side' },
      ]
      : [
        { value: null, type: 'angle' },
        { value: null, type: 'side' },
        { value: null, type: 'angle' },
      ];

    this.errorMessage = null; // Clear any previous errors
    this.cdr.detectChanges(); // Ensure the UI updates immediately
  }

  onValueChange(index: number, value: string) {
    this.inputs[index].value = value ? Number(value) : null;
  }

  calculateTriangle() {
    this.errorMessage = null;
    const context = this.canvasRef.nativeElement.getContext('2d');
    if (!context) return;

    const sides = this.inputs.filter((input) => input.type === 'side' && input.value !== null).map((input) => input.value as number);
    const angles = this.inputs.filter((input) => input.type === 'angle' && input.value !== null).map((input) => input.value as number);

    // Validation
    if (this.mode === 'side-angle-side' && (sides.length !== 2 || angles.length !== 1)) {
      this.errorMessage = 'Please provide exactly two sides and one angle for Side-Angle-Side mode.';
      return;
    }
    if (this.mode === 'angle-side-angle' && (sides.length !== 1 || angles.length !== 2)) {
      this.errorMessage = 'Please provide exactly two angles and one side for Angle-Side-Angle mode.';
      return;
    }

    try {
      // Triangle calculation logic
      const { sides: updatedSides, angles: updatedAngles } = this.solveTriangle(sides, angles);

      // Render the triangle
      this.clearCanvas();
      this.renderTriangle(context, updatedSides, updatedAngles);

      // Clear error message if rendering succeeds
      this.errorMessage = null;
    } catch (error: any) {
      this.errorMessage = error instanceof Error ? error.message : 'Unable to calculate or draw the triangle. Please check your inputs.';
    }
  }

  solveTriangle(sides: number[], angles: number[]): { sides: number[]; angles: number[] } {
    const updatedSides = [...sides];
    const updatedAngles = [...angles];

    if (this.mode === 'side-angle-side') {
      const [a, C, b] = [...updatedSides, ...updatedAngles];
      const c = Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos((C * Math.PI) / 180));
      const A = (Math.asin((a * Math.sin((C * Math.PI) / 180)) / c) * 180) / Math.PI;
      const B = 180 - C - A;
      updatedSides.push(c);
      updatedAngles.push(A, B);
    } else if (this.mode === 'angle-side-angle') {
      const [A, b, B] = [...updatedAngles, ...updatedSides];
      const C = 180 - A - B;
      const a = (b * Math.sin((A * Math.PI) / 180)) / Math.sin((C * Math.PI) / 180);
      const c = (b * Math.sin((B * Math.PI) / 180)) / Math.sin((C * Math.PI) / 180);
      updatedAngles.push(C);
      updatedSides.push(a, c);
    }

    return { sides: updatedSides, angles: updatedAngles };
  }

  renderTriangle(context: CanvasRenderingContext2D, sides: number[], angles: number[]) {
    if (sides.length < 3) {
      this.errorMessage = 'Unable to calculate or draw the triangle.';
      return;
    }

    const canvasSize = Math.min(this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    const scale = (0.8 * canvasSize) / Math.max(...sides);

    const scaledSides = sides.map((side) => side * scale);
    const height = Math.sqrt(Math.abs(scaledSides[0] ** 2 - (scaledSides[2] / 2) ** 2));

    const offsetX = (this.canvasRef.nativeElement.width - scaledSides[2]) / 2;
    const offsetY = (this.canvasRef.nativeElement.height + height) / 2;

    const points = {
      A: { x: offsetX, y: offsetY },
      B: { x: offsetX + scaledSides[2], y: offsetY },
      C: { x: offsetX + scaledSides[2] / 2, y: offsetY - height },
    };

    context.beginPath();
    context.moveTo(points.A.x, points.A.y);
    context.lineTo(points.B.x, points.B.y);
    context.lineTo(points.C.x, points.C.y);
    context.closePath();

    context.strokeStyle = '#65B1C7';
    context.stroke();

    // Add 90-degree angle marker if applicable
    this.addRightAngleMarker(context, points, angles);

    // Add labels
    this.addLabels(context, points, scaledSides, sides, angles);
  }

  addRightAngleMarker(
    context: CanvasRenderingContext2D,
    points: { A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number } },
    angles: number[]
  ) {
    const rightAngleIndex = angles.findIndex((angle) => Math.abs(angle - 90) < 0.01);
    if (rightAngleIndex === -1) return;

    const markerOffset = 15;
    if (rightAngleIndex === 0) {
      context.beginPath();
      context.moveTo(points.A.x, points.A.y);
      context.lineTo(points.A.x + markerOffset, points.A.y);
      context.lineTo(points.A.x, points.A.y - markerOffset);
      context.closePath();
      context.stroke();
    } else if (rightAngleIndex === 1) {
      context.beginPath();
      context.moveTo(points.B.x, points.B.y);
      context.lineTo(points.B.x - markerOffset, points.B.y);
      context.lineTo(points.B.x, points.B.y - markerOffset);
      context.closePath();
      context.stroke();
    } else if (rightAngleIndex === 2) {
      context.beginPath();
      context.moveTo(points.C.x, points.C.y);
      context.lineTo(points.C.x - markerOffset, points.C.y);
      context.lineTo(points.C.x, points.C.y + markerOffset);
      context.closePath();
      context.stroke();
    }
  }

  addLabels(
    context: CanvasRenderingContext2D,
    points: { A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number } },
    scaledSides: number[],
    sides: number[],
    angles: number[]
  ) {
    context.font = '20px Amatic SC, cursive';
    context.fillStyle = '#65B1C7';

    // Side labels
    context.fillText(`Side 1: ${sides[0].toFixed(2)}`, (points.A.x + points.C.x) / 2 - 30, (points.A.y + points.C.y) / 2);
    context.fillText(`Side 2: ${sides[1].toFixed(2)}`, (points.B.x + points.C.x) / 2 + 10, (points.B.y + points.C.y) / 2);
    context.fillText(`Side 3: ${sides[2].toFixed(2)}`, (points.A.x + points.B.x) / 2 - 30, points.A.y + 20);

    // Angle labels
    context.fillText(`Angle 1: ${angles[0].toFixed(2)}°`, points.A.x - 30, points.A.y - 20);
    context.fillText(`Angle 2: ${angles[1].toFixed(2)}°`, points.B.x + 10, points.B.y - 20);
    context.fillText(`Angle 3: ${angles[2].toFixed(2)}°`, points.C.x - 20, points.C.y - 30);
  }

  clearCanvas() {
    const context = this.canvasRef.nativeElement.getContext('2d');
    if (context) {
      context.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    }
  }
}
