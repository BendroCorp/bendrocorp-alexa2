export class Character {
    id?:number;
    user_id?:number;
    first_name?:string;
    nickname?:string;
    last_name?:string;
    full_name?:string;
    description?:string;
    background?:string;

    avatar_url?:string;
    current_job_level?: number
    current_job?:Job
    jobs?:Job[]

    owned_ships?:OwnedShip[]
}

export class Job {
    id?: number
    title?: string
    description?: string
    recruit_job_id?: number
    next_job_id?: number
    division_id?: number
    hiring?: boolean
    job_level_id?: number
}

export class Ship 
{
    id?:number
    name?:string
}

export class OwnedShip 
{
    id?:number
    title?:string
    ship_id?:number
    ship?:Ship
    character_id?:number
    character?:Character
}