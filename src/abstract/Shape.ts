import { Point2d, shapeKind } from "./types.ts";

// forma basic de shape, pozitie, culoare, marime, tip
export abstract class Shape {
    position: Point2d;
    color: string;
    size: number;
    readonly kind: shapeKind;

    constructor(options: {
        position: Point2d;
        color: string;
        size: number;
        kind: shapeKind;
    }) {
        this.position = { x: options.position.x, y: options.position.y };
        this.color = options.color;
        this.size = options.size;
        this.kind = options.kind;
    }
    
    // functie pt rendare in canvas
    abstract draw(ctx: CanvasRenderingContext2D): void;
}