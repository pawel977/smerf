import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GameLifecycleService } from '../services/game-lifecycle.service';
import {
  DrinkGameActions,
  ModifyMemberSInState,
  StartNextShot,
} from './drink-game.actions';
import { map, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  selectGamesList,
  selectIndexOfGame,
  selectPlayers,
  selectQueuePlayers,
} from './selectors';
import { Game } from '../classes/game';
import { Router } from '@angular/router';
import { Player } from '../classes/player';

@Injectable()
export class DrinkGameEffects {
  @Effect()
  data$ = this._actions$.pipe(
    ofType(DrinkGameActions.LoadDataFromLs),
    map(() => {
      const data = this._gameLifeCycleService.getData();
      return {
        type: DrinkGameActions.LoadDataFromLsOnSuccess,
        payload: { games: data },
      };
    })
  );

  @Effect()
  createNewGame$ = this._actions$.pipe(
    ofType(DrinkGameActions.CrateNewGame),
    map(({ payload }: any) => payload.gameName),
    // @ts-ignore
    withLatestFrom(this._store.select(selectGamesList), (name, games) => ({
      name,
      games,
    })),
    // @ts-ignore
    map(({ name, games }) => {
      if (
        games.findIndex((game: Partial<Game>) => game.gameName === name) !== -1
      ) {
        throw Error('Gra o tej nazwie już istnieje!');
      }
      const res = this._gameLifeCycleService.createNewGame(name, games);
      this._router.navigate([`we-polej/game/${name}`]);
      return res;
    }),
    tap(data =>
      this._store.dispatch({
        type: DrinkGameActions.CrateNewGameOnSuccess,
        payload: { games: data },
      })
    ),
    map(() => ({
      type: DrinkGameActions.SetDataToLs,
    }))
  );

  @Effect()
  setDataToLsAndReload$ = this._actions$.pipe(
    ofType(DrinkGameActions.SetDataToLs),
    withLatestFrom(this._store.select(selectGamesList), (action, data) => ({
      action,
      data,
    })),
    tap(({ data }) => {
      this._gameLifeCycleService.setDataToLs(data);
    }),
    map(() => ({
      type: DrinkGameActions.LoadDataFromLs,
    }))
  );

  @Effect()
  createMember$ = this._actions$.pipe(
    ofType(DrinkGameActions.CreateMember),
    withLatestFrom(
      this._store.select(selectPlayers),
      this._store.select(selectIndexOfGame),
      (action, players, gameIndex) => ({
        action,
        players,
        gameIndex,
      })
    ),
    map(({ action, players, gameIndex }: any) => {
      const playerExist =
        players.findIndex(
          (player: Player) => player.nick === action.payload.data.nick
        ) !== -1;
      if (playerExist && !action.payload.isModify) {
        throw Error('Gracz o tym imieniu już istnieje!');
      }
      const player = this._gameLifeCycleService.createNewPlayer(
        action.payload.data
      );
      return {
        type: DrinkGameActions.ModifyMemberSInState,
        payload: { gameIndex, player },
      };
    })
  );

  @Effect()
  createMemberOnSuccess$ = this._actions$.pipe(
    ofType(DrinkGameActions.ModifyMemberSInState),
    map(({}) => ({ type: DrinkGameActions.SetDataToLs }))
  );

  @Effect()
  generateNewQueue$ = this._actions$.pipe(
    ofType(DrinkGameActions.GenereteNewQueue),
    withLatestFrom(
      this._store.select(selectIndexOfGame),
      this._store.select(selectPlayers),
      (action, gameIndex, players) => ({ action, gameIndex, players })
    ),
    map(({ action, gameIndex, players }) => {
      const queuePlayers = this._gameLifeCycleService.genereteNewQueue(players);
      return {
        type: DrinkGameActions.AddToStoreNewQueue,
        payload: { gameIndex, queuePlayers },
      };
    })
  );

  @Effect()
  generateNewQueueSuccess$ = this._actions$.pipe(
    ofType(DrinkGameActions.AddToStoreNewQueue),
    map(({}) => ({ type: DrinkGameActions.SetDataToLs }))
  );

  @Effect()
  StartNextShot$ = this._actions$.pipe(
    ofType(DrinkGameActions.StartNextShot),
    withLatestFrom(
      this._store.select(selectQueuePlayers),
      this._store.select(selectIndexOfGame),
      (action, queuePlayers, gameIndex) => ({ action, queuePlayers, gameIndex })
    ),
    map(({ action, queuePlayers, gameIndex }) => {
      const mappedQueue =
        this._gameLifeCycleService.getSplitetdQueueByFirst(queuePlayers);
      return {
        type: DrinkGameActions.StartNextShotSuccess,
        payload: { gameIndex, queuePlayers: mappedQueue },
      };
    })
  );

  @Effect()
  StartNextShotSuccess$ = this._actions$.pipe(
    ofType(DrinkGameActions.StartNextShotSuccess),
    map(({}) => ({ type: DrinkGameActions.SetDataToLs }))
  );

  constructor(
    private _actions$: Actions,
    private _gameLifeCycleService: GameLifecycleService,
    private _store: Store,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}
}
