import { View, html, on } from "rune-ts";
import style from "./style.module.scss";

interface Props {}

export class CanvasView extends View<Props> {
  private isDrag: boolean = false;

  @on("mousedown")
  private _mouseDown(ev: MouseEvent) {
    this.isDrag = true;
    const { ctx } = this.getData();

    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(ev.offsetX, ev.offsetY);
    }
  }

  @on("mouseup")
  private _mouseUp() {
    this.isDrag = false;
  }

  @on("mousemove")
  private _mouseMove(ev: MouseEvent) {
    if (this.isDrag) {
      const { ctx } = this.getData();
      if (ctx) {
        if (ev.buttons === 1) {
          ctx.lineTo(ev.offsetX, ev.offsetY);
          ctx.strokeStyle = "#faf026";
          ctx.lineWidth = 10;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.stroke();
        }
      }
    }
  }

  clear() {
    const { canvas, ctx } = this.getData();
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  private adjustCanvasSize() {
    const { canvas } = this.getData();
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private getData() {
    const canvas = this.element() as HTMLCanvasElement;
    const base64 = canvas.toDataURL();
    const ctx = canvas.getContext("2d");

    return { canvas, base64, ctx };
  }

  override onMount() {
    this.adjustCanvasSize();
  }

  override template() {
    return html`<canvas class="${style.canvas}"></canvas>`;
  }
}
