import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GameLifecycleService } from '../services/game-lifecycle.service';
import { DrinkGameActions, ModifyMemberSInState } from './drink-game.actions';
import { map, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectGamesList, selectIndexOfGame, selectPlayers } from './selectors';
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
  createMember = this._actions$.pipe(
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
          (player: Player) => player.nick === action.payload.nick
        ) !== -1;
      if (playerExist) {
        throw Error('Gracz o tym imieniu już istnieje!');
      }

      const player = this._gameLifeCycleService.createNewPlayer(action.payload);
      return { action, player, gameIndex };
    }),
    map(({ gameIndex, player }) => {
      return {
        type: DrinkGameActions.ModifyMemberSInState,
        payload: { gameIndex, player },
      };
    })
  );

  constructor(
    private _actions$: Actions,
    private _gameLifeCycleService: GameLifecycleService,
    private _store: Store,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}
}
