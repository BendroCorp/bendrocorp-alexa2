import { Character } from "./character.model";

export class Claim
{
    id?:number;
    title?:string;
}

export class User 
{
    id?:number
    username?:string
    rsi_handle?:string
    main_character?:Character
    roles?:Role[]
}

export class Role extends Claim
{
    nested_roles?:Role[]
}