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
  Sorting,
  Filter,
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
    title: "Date",
    type: Sort.Date,
    children: [
      {
        title: "Newest",
        type: Order.Dec,
      },
      {
        title: "Oldest",
        type: Order.Inc,
      },
    ],
  },
  {
    title: "Size",
    type: Sort.Size,
    children: [
      {
        title: "Smallest",
        type: Order.Inc,
      },
      {
        title: "Largest",
        type: Order.Dec,
      },
    ],
  },
];

export const filteringMenuElement = {
  title: "Typology" as const,
  type: Arrange.Typology,
  children: [] as Typology[],
};
