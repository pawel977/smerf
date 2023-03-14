import { DrinkGameState } from './drink-game.reducer';
import { createSelector } from '@ngrx/store';
import { Game } from '../classes/game';

export const selectDrinkGame = (state: any) => state.drinkGame;

export const selectCurrentGame = createSelector(
  selectDrinkGame,
  (state: DrinkGameState) => state
);
export const selectGamesList = createSelector(
  selectDrinkGame,
  (state: DrinkGameState) => {
    return state?.gamesList;
  }
);

export const selectGamesListNames = createSelector(
  // @ts-ignore
  selectGamesList,
  (state: Game[]) => {
    return state?.map((item: Game) => item?.gameName);
  }
);

export const selectGamesExisting = createSelector(
  selectGamesList,
  (state: Array<Game>) => state?.length > 0
);
