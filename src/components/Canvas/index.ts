import { html, on } from "rune-ts";
import style from "./style.module.scss";

import { AbstractCanvas } from "../AbstractCanvas";

interface Props {}

export type ItemType = "text";

export class CanvasView extends AbstractCanvas<Props> {
  private isDrag = false;
  private offsetX = 0;
  private offsetY = 0;
  private currentValue: Record<PropertyKey, unknown> | null = null;

  @on("dblclick")
  private _dblclick(ev: MouseEvent) {
    const { canvas } = this.getData();
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    const element = this.getElementAtPosition(x, y);
    if (element) {
      const newText = prompt("Edit text:", element.value);
      if (newText !== null) {
        element.value = newText;
        this.draw(element.type);
      }
    }
  }

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
      value: "Text",
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight / 2,
      meta: {
        fontSize: 34,
        fontFamily: "Pretendard",
        color: "#000",
      },
      isEditing: false,
    });

    this.draw("text");
  };

  override template() {
    return html`<canvas class="${style.canvas}"></canvas>`;
  }
}
