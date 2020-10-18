// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type IRow = {
  id: string;
  description: string;
  name: string;
  expression: string;
  value: string;
  unit: string;
  type: "row" | string;
};
export type IHeading = {
  type: string | "heading";
  description: string;
  id: string;
};

export type ChangeProps = { name: string; value: string; id: string };
