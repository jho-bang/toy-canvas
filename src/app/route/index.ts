import { createRouter } from "@rune-ts/server";
import { Route } from "../../pages";

type RouterType = typeof Route;

export const ClientRouter = createRouter<RouterType>({
  ...Route,
});
