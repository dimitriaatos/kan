import type { RuntimeConfig } from "nuxt/schema";
import type { WorkColumns } from "~/@types/work";
import { ColumnType, prependAssetURI } from "~/assets/common";
import type { Archive } from "~/schema";
import type { Works } from "./arrangeBy";

export const getColumns = ({
  work,
  offset,
  config,
}: {
  work: Archive[number];
  offset?: number;
  config?: RuntimeConfig;
}): WorkColumns => {
  const {
    images: [image1],
    drawings: [drawing1],
    ...data
  } = work;

  const columnData: WorkColumns = [
    { data, type: ColumnType.Description },
    {
      src:
        work.images.length !== 0
          ? prependAssetURI(image1.directus_files_id.id, config)
          : "",
      type: ColumnType.Image,
    },
    {
      src:
        work.drawings.length !== 0
          ? prependAssetURI(drawing1.directus_files_id.id, config)
          : "",
      type: ColumnType.Drawing,
    },
  ];
  if (offset !== undefined)
    for (let times = 0; times < offset % columnData.length; times++) {
      columnData.unshift(columnData.pop() as (typeof columnData)[number]);
    }
  return columnData;
};

export const getFormattedWorks = (
  works: Archive,
  config?: RuntimeConfig
): Works => {
  return works.map((work, index) => {
    return {
      work,
      open: false,
      columns: getColumns({ work, config, offset: index }),
    };
  });
};
