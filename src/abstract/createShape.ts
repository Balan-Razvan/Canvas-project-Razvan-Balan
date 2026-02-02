import type { ShapeOptions } from "./types.ts";
import { Shape } from "./Shape.ts";
import { Square } from "../shapes/Square.ts";
import { Circle } from "../shapes/Circle.ts";


// primeste un obiect de tip ShapeOptions, returneaza un obiect circle saus square in functie de optiuni
export function createshape(options: ShapeOptions): Shape {
    const base = {
        position: options.position,
        color: options.color,
        size: options.size,
        kind: options.kind,
    };

    if (options.kind === 'circle') {
        return new Circle(base);
    }
    else {
        return new Square(base);
    }
}