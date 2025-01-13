import { ColumnType } from "~/assets/common";
import type { ArchiveElementNoImage } from "~/assets/schema/archive";

type WorkColumn =
  | { type: ColumnType.Image; src: string }
  | { type: ColumnType.Description; data: ArchiveElementNoImage };

export type WorkColumns = [WorkColumn, WorkColumn, WorkColumn];
