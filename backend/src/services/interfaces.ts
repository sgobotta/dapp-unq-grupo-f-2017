import "reflect-metadata";
import { interfaces } from "inversify";

export interface IMenu {
  name: string;
}



export const TYPES = {
  MenuService: Symbol("Menu")
};
