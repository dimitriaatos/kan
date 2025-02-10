import type { RuntimeConfig } from "nuxt/schema";
import { Order, Sort } from "./arrangeBy";

export enum ColumnType {
  Description,
  Image = "images",
  Drawing = "drawings",
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const gql = String.raw;

export const prependAssetURI = (id: string, config?: RuntimeConfig): string => {
  let _config: RuntimeConfig;
  try {
    _config = useRuntimeConfig();
  } catch {
    if (config !== undefined) _config = config;
    else throw Error("Can't find config");
  }
  return `${_config.public.NUXT_PUBLIC_CMS_URI}/assets/${id}`;
};

export const TITLE = "KAN";

export const getPageTitle = (title: string | null): string => {
  return title === null ? TITLE : `${TITLE} | ${title}`;
};

export const defaultSorting = {
  type: Sort.Date,
  order: Order.Dec,
};

export const mobileBreakpoint = 800;
