import { ReactNode } from "react";

export type Children = string | JSX.Element | JSX.Element[] | ReactNode;
export interface IUrl {
  filename: string;
  url: string;
  expires: string;
}
export interface IImage {
  id: string;
  filename: string;
  user: string;
  url: IUrl;
  thumbnail: IUrl;
  description: string;
  createdAt: string;
  updatedAt: string;
}
