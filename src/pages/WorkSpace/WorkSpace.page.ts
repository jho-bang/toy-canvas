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
  canvasView = new CanvasView({});
  topPanelView = new TopPanelView({});
  rightPanelView = new RightPanelView({});
  leftPanelView = new LeftPanelView({});

  @on("keydown")
  override template() {
    return html`<div class="${style.workspace}">
      ${this.topPanelView} ${this.leftPanelView} ${this.rightPanelView}
      ${this.canvasView}
    </div>`;
  }
}
