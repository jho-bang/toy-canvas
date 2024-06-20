import { View, html } from "rune-ts";
import style from "./style.module.scss";

interface Props {}

export class LeftPanelView extends View<Props> {
  override template() {
    return html`<div class="${style.panel}">
      <div class="${style.item}">좌측 패널</div>
      <div class="${style.item}">좌측 패널</div>
      <div class="${style.item}">좌측 패널</div>
      <div class="${style.item}">좌측 패널</div>
      <div class="${style.item}">좌측 패널</div>
      <div class="${style.item}">좌측 패널</div>
      <div class="${style.item}">좌측 패널</div>
    </div>`;
  }
}