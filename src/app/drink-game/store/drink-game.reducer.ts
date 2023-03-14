import { Game } from '../classes/game';
import * as DrinkGameActions from './drink-game.actions';

export interface DrinkGameState {
  currentGame: string | null;
  gamesList: Game[];
}

export const initialStateDrinkGame: DrinkGameState = {
  currentGame: null,
  gamesList: [],
};

export function drinkGameReducer(
  state = initialStateDrinkGame,
  action: DrinkGameActions.DrinkGameUnion
): DrinkGameState {
  switch (action.type) {
    case DrinkGameActions.DrinkGameActions.SetCurrentGame:
      return {
        ...state,
        currentGame: action.payload.name,
      };
    case DrinkGameActions.DrinkGameActions.ClearCurrentGame:
      return {
        ...state,
        currentGame: null,
      };
    case DrinkGameActions.DrinkGameActions.LoadDataFromLsOnSuccess:
      return {
        ...state,
        gamesList: action.payload.games,
      };
    default: {
      return state;
    }
  }
}
