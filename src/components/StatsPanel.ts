import type { WindowState } from "../abstract/types.js";

export class StatsPanel {
    private el: HTMLElement;

    constructor(container: HTMLElement) {
        this.el = container;
    }

    render(state: WindowState) : void {
        this.el.innerHTML = `
        <dl>
            <dt>scroll</dt><dd>${state.scrollx}, ${state.scrolly}</dd>
            <dt>inner</dt><dd>${state.innerWidth} x ${state.innerHeight}</dd>
            <dt>canvas</dt><dd>${state.canvasWidth} x ${state.canvasHeight}</dd>
            <dt>shapes</dt><dd>${state.shapeCount}</dd>
        </dl>
        `;
    }
}