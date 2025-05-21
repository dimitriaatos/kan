import type { WorkColumns } from "~/@types/work";
import type { Archive, Typology } from "~/schema";

export type Works = Array<{
  work: Archive[number];
  columns: WorkColumns;
  open: boolean;
}>;

export enum Order {
  Inc = "",
  Dec = "-",
}

export enum Type {
  Sorting = 0,
  Filter = 1,
}

export enum Sort {
  Date = "year",
  Size = "size",
}

enum Filter {
  Typology = "typology",
}

export const Arrange = {
  ...Filter,
  ...Sort,
};

export type ArrangeType = Filter | Sort;

export const sortingMenu = [
  {
    title: "DATE",
    type: Sort.Date,
    children: [
      {
        title: "newest",
        type: Order.Dec,
      },
      {
        title: "oldest",
        type: Order.Inc,
      },
    ],
  },
  {
    title: "SIZE",
    type: Sort.Size,
    children: [
      {
        title: "smallest",
        type: Order.Inc,
      },
      {
        title: "largest",
        type: Order.Dec,
      },
    ],
  },
];

export const filteringMenuElement = {
  title: "TYPOLOGY" as const,
  type: Arrange.Typology,
  children: [] as Typology[],
};
