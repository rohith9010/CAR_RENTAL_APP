import { ICities } from "./ICities";
import { ICountries } from "./ICountries";


export interface IStates {
    StateNo : number;
    state : string;
    Citys : ICities[];
    CountryNo : number;
}
