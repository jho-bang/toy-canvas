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
  topPanelView = new TopPanelView({});
  rightPanelView = new RightPanelView({});
  leftPanelView = new LeftPanelView({});

  @on("mousedown")
  private _mouseDown(ev: MouseEvent) {
    this.isShow = !this.isShow;

    if (this.isShow) {
      this.topPanelView.show("top");
      this.leftPanelView.show("left");
      this.rightPanelView.show("right");
    } else {
      this.topPanelView.hide("top");
      this.leftPanelView.hide("left");
      this.rightPanelView.hide("right");
    }
  }

  override template() {
    return html`<div class="${style.workspace}">
      ${this.topPanelView} ${this.leftPanelView} ${this.rightPanelView}
      ${this.canvasView}
    </div>`;
  }
}
