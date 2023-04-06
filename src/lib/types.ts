import { ReactNode } from "react";

export type Children = string | JSX.Element | JSX.Element[] | ReactNode;

export interface IImage {
  id: string;
  url: string;
  description: string;
  //   createdAt: string;
  //   updatedAt: string;
}
