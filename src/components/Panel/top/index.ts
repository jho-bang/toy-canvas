import { html, on } from "rune-ts";
import style from "./style.module.scss";
import { CommonPanel } from "../common";
import type { ItemType } from "../../Canvas";

import TextIcon from "../../../../public/assets/text.png";

interface Props {
  addText(): void;
}

export class TopPanelView extends CommonPanel<Props> {
  @on("click", `.${style.item}`)
  private _click(ev: MouseEvent) {
    const target = ev.currentTarget;
    if (!target || !(target instanceof HTMLDivElement)) return;
    const type = target.dataset.type as ItemType;
    this.actionFromType(type);
  }

  private actionFromType(type: ItemType) {
    switch (type) {
      case "text":
        return this.data.addText();
      default:
        return null;
    }
  }

  override template() {
    return html`<div
      class="${style.panel}"
      style="transform: translateX(-50%) translateY(0%)"
    >
      <div class="${style.item}" data-type="text">
        <img src="${TextIcon}" alt="텍스트 아이콘" />
      </div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
      <div class="${style.item}">패널</div>
    </div>`;
  }
}
