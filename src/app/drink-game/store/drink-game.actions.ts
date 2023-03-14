import { Action } from '@ngrx/store';
import { Game } from '../classes/game';

const moduleName = '[Drink Game]';
export enum DrinkGameActions {
  SetCurrentGame = `[Drink Game] SetCurrentGame`,
  ClearCurrentGame = `[Drink Game] ClearCurrentGame`,
  LoadDataFromLs = `[Drink Game] LoadDataFromLs`,
  LoadDataFromLsOnSuccess = `[Drink Game] LoadDataFromLsOnSuccess`,
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

export type DrinkGameUnion =
  | SetCurrentGame
  | ClearCurrentGame
  | LoadDataFromLs
  | LoadDataFromLsOnSuccess;
