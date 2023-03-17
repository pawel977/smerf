import { Action } from '@ngrx/store';
import { Game } from '../classes/game';
import { DrinkGameState } from './drink-game.reducer';
import { Player } from '../classes/player';

const moduleName = '[Drink Game]';
export enum DrinkGameActions {
  SetCurrentGame = `[Drink Game] SetCurrentGame`,
  ClearCurrentGame = `[Drink Game] ClearCurrentGame`,
  LoadDataFromLs = `[Drink Game] LoadDataFromLs`,
  LoadDataFromLsOnSuccess = `[Drink Game] LoadDataFromLsOnSuccess`,
  CrateNewGame = `[Drink Game] CrateNewGame`,
  CrateNewGameOnSuccess = `[Drink Game] CrateNewGameOnSuccess`,
  SetDataToLs = `[Drink Game] SetDataToLs`,
  CreateMember = `[Drink Game] CreateMember`,
  ModifyMemberSInState = `[Drink Game] ModifyMemberSInState`,
}

export class SetCurrentGame implements Action {
  readonly type = DrinkGameActions.SetCurrentGame;
  constructor(public payload: { name: string }) {}
}
export class ClearCurrentGame implements Action {
  readonly type = DrinkGameActions.ClearCurrentGame;
}
export class LoadDataFromLs implements Action {
  readonly type = DrinkGameActions.LoadDataFromLs;
}
export class LoadDataFromLsOnSuccess implements Action {
  readonly type = DrinkGameActions.LoadDataFromLsOnSuccess;
  constructor(public payload: { games: Game[] }) {}
}
export class CrateNewGame implements Action {
  readonly type = DrinkGameActions.CrateNewGame;
  constructor(public payload: { gameName: string }) {}
}
export class CrateNewGameOnSuccess implements Action {
  readonly type = DrinkGameActions.CrateNewGameOnSuccess;
  constructor(public payload: { games: Game[] }) {}
}
export class SetDataToLs implements Action {
  readonly type = DrinkGameActions.SetDataToLs;
}

export class CreateMember implements Action {
  readonly type = DrinkGameActions.CreateMember;
  constructor(public payload: { nick: string; imgUrl: string }) {}
}
export class ModifyMemberSInState implements Action {
  readonly type = DrinkGameActions.ModifyMemberSInState;
  constructor(public payload: { gameIndex: number; player: any }) {}
}

export type DrinkGameUnion =
  | SetCurrentGame
  | ClearCurrentGame
  | LoadDataFromLs
  | LoadDataFromLsOnSuccess
  | CrateNewGame
  | CrateNewGameOnSuccess
  | SetDataToLs
  | CreateMember
  | ModifyMemberSInState;
