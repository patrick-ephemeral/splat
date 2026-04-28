export enum Team {
    Warm = 11,
    Neutral = 22,
    Cold = 33,
}

export interface Pole {
    x: number;
    y: number;
    team: Team;
}