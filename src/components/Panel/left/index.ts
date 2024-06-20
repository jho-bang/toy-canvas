import { html } from "rune-ts";
import style from "./style.module.scss";
import { CommonPanel } from "../common";

interface Props {}

export class LeftPanelView extends CommonPanel<Props> {
  override template() {
    return html`<div
      class="${style.panel}"
      style="transform: translateX(0) translateY(-50%)"
    >
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
    </div>`;
  }
}
