import { IStates } from "./IStates";

export interface ICountries {
    CountryNo : number;
    Country : string;
    States:IStates[];
}
