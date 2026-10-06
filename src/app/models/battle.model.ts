export interface BattlesModel {
    character: string;
    type: string;
    modes: BattlesModesModel[];
}

export interface BattlesModesModel {
    versus: string;
    easy: boolean;
    hard: boolean;
}