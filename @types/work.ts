import type { ColumnType } from "~/assets/common";
import type { ArchiveElementNoImage } from "~/schema/archive";

type WorkColumn =
  | { type: ColumnType.Image; src: string }
  | { type: ColumnType.Drawing; src: string }
  | { type: ColumnType.Description; data: ArchiveElementNoImage };

export type WorkColumns = [WorkColumn, WorkColumn, WorkColumn];
