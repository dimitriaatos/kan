export enum Type {
  Sorting,
  Filter,
}

export enum Size {
  Inc = "Smallest",
  Dec = "Largest",
}

export enum Date {
  Inc = "Newest",
  Dec = "Oldest",
}

export const menu = [
  {
    title: "Date",
    property: "date",
    type: Type.Sorting,
    children: [Date.Inc, Date.Dec],
  },
  {
    title: "Size",
    property: "size",
    type: Type.Sorting,
    children: [Size.Inc, Size.Dec],
  },
  {
    title: "Typology",
    property: "categories",
    type: Type.Filter,
    children: ["COMMERCIAL", "RESIDENTIAL"],
  },
] as const;
