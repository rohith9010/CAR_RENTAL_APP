import { IState } from "./istate";

export interface ICountry {
    CountryNo:number;
    Country:string;
    States:IState[];
}