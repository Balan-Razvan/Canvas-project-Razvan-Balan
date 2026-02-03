import { Bounds, Shape } from "../components/Shape.ts";

export class Circle extends Shape {
  get radius(): number {
    return this.size;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  getBounds(): Bounds {
    const r = this.radius;
    return {
      left: this.position.x - r,
      right: this.position.x + r,
      top: this.position.y - r,
      bottom: this.position.y + r,
    };
  }
}
