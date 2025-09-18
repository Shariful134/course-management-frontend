import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  Data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TRegsiter = {
  name: string;
  email: string;
  password: string;
};

export type TUser = {
  userId: string;
  userName?: string;
  role: string;
  iat: number;
  exp: number;
};

export type TCustomUser = {
  _id?: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
};

export type TUserPaths = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPaths[];
};

export type TSidebarItem =
  | {
      key: string | undefined;
      label?: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TBook = {
  _id?: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  publicationDate: string;
  publisher: string;
  imageURL: string;
};
export type TqueryParams = {
  name: string;
  value: boolean | React.Key;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
