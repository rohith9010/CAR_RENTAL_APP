import { ICity } from "./ICity";

export interface IState {
    
    StateNo:number;
    state:string;
    CountryNo:number;
    Citys:ICity[];
}