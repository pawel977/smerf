import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { GameLifecycleService } from '../services/game-lifecycle.service';
import { ClearCurrentGame, DrinkGameActions } from './drink-game.actions';
import { map, mergeMap, tap } from 'rxjs';

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

  constructor(
    private _actions$: Actions,
    private _gameLifeCycleService: GameLifecycleService
  ) {}
}
