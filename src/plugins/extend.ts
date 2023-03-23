import { first, last, sample } from "lodash";
import { useNumberFormat } from "./utils";
import dayjs from "dayjs";

declare global {
  interface Number {
    toDate(this: number, format?: string): string;
    numberFormat(this: number): string | number;
  }

  interface Array<T> {
    first<T>(this: T[]): T;
    last<T>(this: T[]): T;
    sample<T>(this: T[]): T;
    artistsName<T>(this: T[]): T;
  }
  interface String {
    toInt(this: string): number;
  }
}

Number.prototype.numberFormat = function (this: number): string | number {
  return useNumberFormat(this);
};
Number.prototype.toDate = function (this: number, format: string = "YYYY-MM-DD"): string {
  return dayjs(this).format(format);
};

Array.prototype.first = function <T>(this: T[]): T {
  return first<T>(this) as T;
};
Array.prototype.last = function <T>(this: T[]): T {
  return last<T>(this) as T;
};
Array.prototype.sample = function <T>(this: T[]): T {
  return sample<T>(this) as T;
};
Array.prototype.artistsName = function <T>(this: T[]): T {
  //返回所有artists数组的name
  return {} as T;
};

String.prototype.toInt = function (this: string): number {
  return parseInt(this);
};
