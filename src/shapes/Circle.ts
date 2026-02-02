import { Shape } from "../abstract/Shape.ts";

export class Circle extends Shape {
    get radius(): number {
        return this.size;
    }

    draw(ctx: CanvasRenderingContext2D) : void {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}