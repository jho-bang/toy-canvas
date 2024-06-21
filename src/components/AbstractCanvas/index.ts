import { View } from "rune-ts";
import type { ItemType } from "../Canvas";
import { each, filter, find, pipe } from "@fxts/core";

export class AbstractCanvas<T extends object> extends View<T> {
  items: Array<{
    type: ItemType;
    value: string;
    x: number;
    y: number;
    meta: { fontSize: number; fontFamily: string; color: string };
    isEditing: boolean;
  }> = [];

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

  getElementAtPosition(x: number, y: number) {
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

  adjustCanvasSize() {
    const { canvas, ctx } = this.getData();
    if (!ctx) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  getData() {
    const canvas = this.element() as HTMLCanvasElement;
    const base64 = canvas.toDataURL();
    const ctx = canvas.getContext("2d");

    return { canvas, base64, ctx };
  }

  override onMount() {
    this.adjustCanvasSize();
  }
}
