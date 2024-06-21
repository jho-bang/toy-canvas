import { html, on, Page } from "rune-ts";
import {
  CanvasView,
  LeftPanelView,
  RightPanelView,
  TopPanelView,
} from "../../components";

import style from "./WorkSpace.module.scss";

interface Props {}

export class WorkSpacePage extends Page<Props> {
  private isShow = true;
  canvasView = new CanvasView({});
  topPanelView = new TopPanelView({
    addText: this.canvasView.addText,
  });
  rightPanelView = new RightPanelView({});

  @on("keydown")
  private _showHide(ev: KeyboardEvent) {
    if (ev.metaKey && ev.key === "/") {
      this.isShow = !this.isShow;
      this.topPanelView[this.isShow ? "show" : "hide"]("top");
      this.rightPanelView[this.isShow ? "show" : "hide"]("right");
    }
  }

  override onRender() {
    this.element().focus();
  }

  override template() {
    return html`<div class="${style.workspace}" tabindex="0">
      ${this.topPanelView} ${this.rightPanelView} ${this.canvasView}
    </div>`;
  }
}
