import type { WorkColumns } from "~/@types/work";
import { ColumnType, prependAssetURI } from "~/assets/common";
import type { Archive } from "~/schema";

export const getColumns = (
  work: Archive[number],
  offset?: number
): WorkColumns => {
  const {
    images: [image1, image2],
    ...data
  } = work;

  let columnData: WorkColumns = [
    { data, type: ColumnType.Description },
    {
      src: prependAssetURI(image1.directus_files_id.id),
      type: ColumnType.Image,
    },
    {
      src: prependAssetURI(image2.directus_files_id.id),
      type: ColumnType.Image,
    },
  ];
  if (offset !== undefined)
    for (let times = 0; times < offset % columnData.length; times++) {
      columnData.unshift(columnData.pop() as (typeof columnData)[number]);
    }

  return columnData;
};
