import { ICity } from "./icity";

export interface IState {
    StateNo:number;
    state:string;
    CountryNo:number;
    cities:ICity[];
}