import { View, html } from "rune-ts";
import style from "./style.module.scss";

interface Props {}

export class RightPanelView extends View<Props> {
  override template() {
    return html`<div class="${style.panel}">
      <div class="${style.item}">우측 패널</div>
      <div class="${style.item}">우측 패널</div>
      <div class="${style.item}">우측 패널</div>
      <div class="${style.item}">우측 패널</div>
      <div class="${style.item}">우측 패널</div>
      <div class="${style.item}">우측 패널</div>
      <div class="${style.item}">우측 패널</div>
    </div>`;
  }
}
