import { DrinkGameState } from './drink-game.reducer';
import { createSelector } from '@ngrx/store';
import { Game } from '../classes/game';

export const selectDrinkGame = (state: any) => state.drinkGame;

export const selectGamesList = createSelector(
  selectDrinkGame,
  (state: DrinkGameState) => {
    return state?.gamesList;
  }
);

export const selectCurrentGameName = createSelector(
  selectDrinkGame,
  state => state.currentGame
);

export const selectCurrentGame = createSelector(
  selectCurrentGameName,
  selectGamesList,
  (gameName, gameList: Game[]) => {
    if (gameName !== null) {
      const index = gameList.findIndex(
        (game: Game) => game.gameName === gameName
      );
      return gameList[index];
    }
    return null;
  }
);

export const selectPlayers = createSelector(selectCurrentGame, state => {
  if (state) {
    return state?.membersOfGame;
  }
  return [];
});

export const selectIndexOfGame = createSelector(
  selectCurrentGameName,
  selectGamesList,
  (name: any, membersList: any[]) => {
    return membersList?.findIndex(game => game.gameName === name);
  }
);

export const selectIsGameExist = createSelector(
  selectCurrentGameName,
  selectGamesList,
  (gameName, gameList) => {
    if (!gameName) {
      return false;
    }
    return gameList?.findIndex(game => game.gameName === gameName) !== -1;
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
