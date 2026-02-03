import { Bounds, Shape } from "../components/Shape.ts";

export class Square extends Shape {
  get halfSize(): number {
    return this.size;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const h = this.halfSize;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x - h, this.position.y - h, h * 2, h * 2);
    ctx.restore();
  }

  getBounds(): Bounds {
    const h = this.halfSize;
    return {
      left: this.position.x - h,
      right: this.position.x + h,
      top: this.position.y - h,
      bottom: this.position.y + h,
    };
  }
}
