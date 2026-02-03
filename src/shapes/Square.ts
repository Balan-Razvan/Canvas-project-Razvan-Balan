import { Shape } from "../components/Shape.ts";

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
}
