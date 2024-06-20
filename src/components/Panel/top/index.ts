import { html } from "rune-ts";
import style from "./style.module.scss";
import { CommonPanel } from "../common";

interface Props {}

export class TopPanelView extends CommonPanel<Props> {
  override template() {
    return html`<div
      class="${style.panel}"
      style="transform: translateX(-50%) translateY(0%)"
    >
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
    </div>`;
  }
}
