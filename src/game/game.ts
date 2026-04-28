import { Pole, Team } from "./pole";

export interface GameState {
    poles: Pole[];
}

export const getGame = () => {

    const poles: Pole[] = [];

    for (let x = 0; x < 20; x += 1) {
        for (let y = 0; y < 20; y += 1) {
            if (y % 2 === 1 && x === 19) {
                continue;
            }

            poles.push({
                x,
                y,
                team: x < 5 ? Team.Warm : x > 14 ? Team.Cold : Team.Neutral,
            });
        }
    }

    return () => {
        const gameState: GameState = {
            poles,
        };

        return gameState;
    };
};