import { View } from "rune-ts";
import anime from "animejs";

export class CommonPanel<T extends object> extends View<T> {
  hide(placement: "top" | "left" | "right") {
    const translateX =
      placement === "top" ? "-50%" : placement === "left" ? "-120%" : "120%";
    const translateY = placement === "top" ? "-120%" : "-50%";

    anime({
      targets: this.element(),
      translateX: translateX,
      translateY: translateY,
      easing: "easeOutQuad",
      duration: 500,
      opacity: 0,
    });
  }

  show(placement: "top" | "left" | "right") {
    const translateX = placement === "top" ? "-50%" : "0";
    const translateY = placement === "top" ? "0" : "-50%";

    anime({
      targets: this.element(),
      translateX: translateX,
      translateY: translateY,
      easing: "easeOutQuad",
      duration: 500,
      opacity: 1,
    });
  }
}
