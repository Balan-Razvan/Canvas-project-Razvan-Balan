import { createshape} from "../abstract/createShape.ts";
import { type Shape } from "./Shape.ts";
import type { ShapeOptions } from "../abstract/types.ts";

export class CanvasService {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = [];

    constructor(canvasEl: HTMLCanvasElement) {
        this.canvas = canvasEl;
        const ctx = canvasEl.getContext('2d');
        if(!ctx) {
            throw new Error("cant get context from canvas");
        }
        this.ctx = ctx;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    private resize(): void {
        const dpr = window.devicePixelRatio ?? 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = Math.round(rect.width * dpr);
        this.canvas.height = Math.round(rect.height * dpr);
        this.ctx.scale(dpr, dpr);
        this.redraw();
    }

    placeShape(options: Partial<ShapeOptions> & { kind: ShapeOptions['kind'] }) : Shape {
        const full: ShapeOptions = {
            kind: options.kind,
            position: options.position ?? {
                x: this.getWidth() / 2,
                y: this.getHeight() / 2,
            },
            color: options.color ?? '#b82f6',
            size: options.size ?? 40,
        };
        const shape = createshape(full);
        this.shapes.push(shape);
        this.redraw();
        return shape;
    }

    getShapeCount(): number{
        return this.shapes.length;
    }
    getWidth(): number {
        return this.canvas.clientWidth;
    }
    getHeight(): number {
        return this.canvas.clientHeight;
    }

    private redraw(): void {
        const w = this.getWidth();
        const h = this.getHeight();
        this.ctx.clearRect(0, 0, w, h);
        for(const shape of this.shapes) {
            shape.draw(this.ctx);
        }
    }

}