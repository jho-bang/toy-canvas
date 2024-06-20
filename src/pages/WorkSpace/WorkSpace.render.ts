import { type LayoutData, MetaView } from "@rune-ts/server";
import { WorkSpacePage } from "./WorkSpace.page";
import type { RenderHandlerType } from "../../types/renderHanderType";

export const WorkSpaceRender: RenderHandlerType<typeof WorkSpacePage> = (
  WorkSpacePage,
) => {
  return (req, res, next) => {
    const layoutData: LayoutData = {
      ...res.locals.layoutData,
    };

    res.send(
      new MetaView(
        WorkSpacePage({}, { is_mobile: false }),
        layoutData,
      ).toHtml(),
    );
  };
};
