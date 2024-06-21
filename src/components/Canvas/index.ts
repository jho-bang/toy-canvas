import { View, html, on } from "rune-ts";
import { pipe, filter, find, each } from "@fxts/core";
import style from "./style.module.scss";

interface Props {}

export type ItemType = "text";

export class CanvasView extends View<Props> {
  private isDrag = false;
  private offsetX = 0;
  private offsetY = 0;
  private currentValue: Record<PropertyKey, unknown> | null = null;

  private items: Array<{
    type: ItemType;
    value: string;
    x: number;
    y: number;
    meta: { fontSize: number; fontFamily: string; color: string };
    isEditing: boolean;
  }> = [];

  @on("mousedown")
  private _mousedown(ev: MouseEvent) {
    const { canvas } = this.getData();
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const element = this.getElementAtPosition(x, y);
    if (element) {
      this.isDrag = true;
      this.currentValue = element;
      this.offsetX = x - element.x;
      this.offsetY = y - element.y;
    }
  }

  @on("mousemove")
  private _mousemove(ev: MouseEvent) {
    if (this.isDrag && this.currentValue) {
      const { canvas } = this.getData();
      const rect = canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      this.currentValue.x = x - this.offsetX;
      this.currentValue.y = y - this.offsetY;
      this.clear();
      this.draw("text");
    }
  }

  @on("mouseup")
  private _mouseup(ev: MouseEvent) {
    this.isDrag = false;
    this.currentValue = null;
  }

  addText = () => {
    const { canvas, ctx } = this.getData();
    if (!ctx) return;

    this.items.push({
      type: "text",
      value: "Drag me!",
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight / 2,
      meta: {
        fontSize: 34,
        fontFamily: "Arial",
        color: "#000",
      },
      isEditing: false,
    });

    this.draw("text");
  };

  draw(type: ItemType) {
    const { ctx } = this.getData();
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    pipe(
      this.items,
      filter((item) => item.type === type),
      each((item) => {
        ctx.font = `${item.meta.fontSize}px ${item.meta.fontFamily}`;
        ctx.fillStyle = item.meta.color;
        ctx.fillText(item.value, Math.round(item.x), Math.round(item.y));
      }),
    );
  }

  clear() {
    const { canvas, ctx } = this.getData();
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private getElementAtPosition(x: number, y: number) {
    const { ctx } = this.getData();
    if (!ctx) return;

    return pipe(
      this.items,
      find((item) => {
        if (item.type === "text") {
          const width = ctx.measureText(item.value).width;
          const height = item.meta.fontSize;
          return (
            x >= item.x &&
            x <= item.x + width &&
            y >= item.y - height &&
            y <= item.y
          );
        }

        return false;
      }),
    );
  }

  private adjustCanvasSize() {
    const { canvas, ctx } = this.getData();
    if (!ctx) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
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
