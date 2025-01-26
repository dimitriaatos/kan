export enum ColumnType {
  Description,
  Image,
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const gql = String.raw;

export const prependAssetURI = (id: string): string => {
  const config = useRuntimeConfig();
  return `${config.public.NUXT_PUBLIC_CMS_URI}/assets/${id}`;
};

export const TITLE = "KAN";

export const getPageTitle = (title: string | null): string => {
  return title === null ? TITLE : `${TITLE} | ${title}`;
};
