import { Game } from '../classes/game';
import * as DrinkGameActions from './drink-game.actions';
import { Player } from '../classes/player';

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
    case DrinkGameActions.DrinkGameActions.ModifyMemberSInState:
      return {
        ...state,
        gamesList: state.gamesList.map<Game>((element: Game, index: number) => {
          if (index !== action.payload.gameIndex) {
            return element;
          }

          const indexOfPlayer = element.membersOfGame.findIndex(
            (member: Player) => member.nick === action.payload.player.nick
          );

          let mappedGame: Game = Object.assign({}, element);
          let mappedArrayOfPlayers: Player[] = element.membersOfGame.slice();

          if (indexOfPlayer !== -1) {
            mappedArrayOfPlayers[indexOfPlayer] = action.payload.player;
          } else {
            mappedArrayOfPlayers.push(action.payload.player);
          }
          mappedGame.membersOfGame = mappedArrayOfPlayers;
          return mappedGame;
        }),
      };
    case DrinkGameActions.DrinkGameActions.AddToStoreNewQueue:
      return {
        ...state,
        gamesList: state.gamesList.map<Game>((element: Game, index: number) => {
          if (index !== action.payload.gameIndex) {
            return element;
          }
          let mappedObj: Game = Object.assign({}, element);

          mappedObj.queuePlayers = action.payload.queuePlayers;

          return mappedObj;
        }),
      };
    case DrinkGameActions.DrinkGameActions.StartNextShotSuccess: {
      return {
        ...state,
        gamesList: state.gamesList.map<Game>((element: Game, index: number) => {
          if (index !== action.payload.gameIndex) {
            return element;
          }
          let mappedObj: Game = Object.assign({}, element);
          mappedObj.queuePlayers = action.payload.queuePlayers;
          return mappedObj;
        }),
      };
    }
    default: {
      return state;
    }
  }
}
