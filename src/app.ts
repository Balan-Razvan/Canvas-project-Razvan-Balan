import type { Point2d, shapeKind, WindowState } from "./abstract/types.ts";
import { CanvasService } from "./components/CanvasService.ts";
import { StatsPanel } from "./components/StatsPanel.ts";


const canvasEl = document.getElementById("canvas") as HTMLCanvasElement | null;
const statsEl = document.getElementById("window-state");
const btnPlace = document.getElementById("btn-place");
const shapeType = document.getElementById("shape-type") as HTMLSelectElement | null;
const shapeColor = document.getElementById("shape-color") as HTMLInputElement | null;
const shapeSize = document.getElementById("shape-size") as HTMLInputElement | null;
const sizeValueSpan = document.getElementById("size-value");

if (!canvasEl || !statsEl || !btnPlace || !shapeType || !shapeColor || !shapeSize || !sizeValueSpan) {
    throw new Error('missing dom elements');
}


const canvasService = new CanvasService(canvasEl);
const statsPanel = new StatsPanel(statsEl);

let nextPosition: Point2d | null = null;


function getPreviewOptions(): { kind: shapeKind; position: Point2d; color: string; size: number } | null {
    if(!nextPosition) return null;
    return {
        kind: shapeType!.value as shapeKind,
        position: nextPosition,
        color: shapeColor!.value,
        size: Number(shapeSize!.value),
    }
}

function updatePreview(): void {
    canvasService.setPreview(getPreviewOptions());
}

canvasEl.addEventListener('click', (e: MouseEvent) => {
    const rect = canvasEl.getBoundingClientRect();
    nextPosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
    updatePreview();
    refreshStats();
});

function refreshStats(): void {
    const state: WindowState = {
        scrollx: window.scrollX,
        scrolly: window.scrollY,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        canvasWidth: canvasService.getWidth(),
        canvasHeight: canvasService.getHeight(),
        shapeCount: canvasService.getShapeCount(),
        nextPosition,
    } ;
    statsPanel.render(state);
}

shapeSize.addEventListener('input', () => {
    sizeValueSpan.textContent = shapeSize.value;
    updatePreview();
});

shapeType.addEventListener('change', updatePreview);
shapeColor.addEventListener('input', updatePreview);

btnPlace.addEventListener('click', () => {
    const kind = shapeType.value as shapeKind;
    const color = shapeColor.value;
    const size = Number(shapeSize.value);
    const result = canvasService.placeShape({
        kind, 
        color,
        size,
        position: nextPosition ?? undefined,
    });
    if(result === null){
        alert('that spot is taken');
    } else {
        canvasService.setPreview(null);
    }
    refreshStats();
});

refreshStats();
setInterval(refreshStats, 200);