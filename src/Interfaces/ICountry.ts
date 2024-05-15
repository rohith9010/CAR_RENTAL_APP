import { IState } from "./IState";

export interface ICountry {
    
    CountryNo:number;
    Country:string;
    States:IState[];
}