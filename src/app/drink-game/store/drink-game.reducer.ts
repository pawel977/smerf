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
    case DrinkGameActions.DrinkGameActions.CrateNewGameOnSuccess:
      return {
        ...state,
        gamesList: action.payload.games,
      };
    // case DrinkGameActions.DrinkGameActions.ModifyMemberSInState:
    //   return {
    //     ...state,
    //     gamesList: state.gamesList.map<Game[]>(
    //       (element: Game, index: number) => {
    //         if (index !== action.payload.gameIndex) {
    //           return element;
    //         }
    //         return {
    //           ...element,
    //           membersOfGame: action.payload.player,
    //         };
    //       }
    //     ),
    //   };
    default: {
      return state;
    }
  }
}
