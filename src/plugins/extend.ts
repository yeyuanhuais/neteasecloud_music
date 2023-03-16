import { first, last, sample } from "lodash";
import { useNumberFormat } from "./utils";

declare global {
  interface Number {
    numberFormat(this: number): string | number;
  }

  interface Array<T> {
    first<T>(this: T[]): T;
    last<T>(this: T[]): T;
    sample<T>(this: T[]): T;
  }
  interface String {
    toInt(this: string): number;
  }
}

Number.prototype.numberFormat = function (this: number): string | number {
  return useNumberFormat(this);
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

String.prototype.toInt = function (this: string): number {
  return parseInt(this);
};
