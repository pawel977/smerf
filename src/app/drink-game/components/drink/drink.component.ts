import { Component, OnInit } from '@angular/core';
import { InitGameByNameComponent } from '../../modals/init-game-by-name/init-game-by-name.component';
import { MatDialog } from '@angular/material/dialog';
import { GameLifecycleService } from '../../services/game-lifecycle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExistingGameListComponent } from '../../modals/existing-game-list/existing-game-list.component';
import { select, Store } from '@ngrx/store';
import {
  selectCurrentGame,
  selectGamesExisting,
  selectGamesList,
  selectGamesListNames,
} from '../../store/selectors';
import {
  CrateNewGame,
  DrinkGameActions,
  LoadDataFromLs,
} from '../../store/drink-game.actions';
import { first, map } from 'rxjs';
import { Game } from '../../classes/game';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
})
export class DrinkComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private gameLifecycleService: GameLifecycleService,
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store
  ) {}
  ngOnInit(): void {
    this._store.dispatch({ type: DrinkGameActions.LoadDataFromLs });
  }

  public createNewGame() {
    const dialogRef = this.dialog.open(InitGameByNameComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((gameName: string) => {
      if (gameName) {
        this._store.dispatch({
          type: DrinkGameActions.CrateNewGame,
          payload: { gameName },
        });
      }
    });
  }

  gamesExisting$() {
    // @ts-ignore
    return this._store.pipe(select(selectGamesExisting));
  }

  openExistingGameList() {
    const dialogRef = this.dialog.open(ExistingGameListComponent, {
      width: '500 px',
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.router.navigate([`game/${result}`], { relativeTo: this.route });
      }
    });
  }
}
