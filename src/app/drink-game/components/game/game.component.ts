import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  BehaviorSubject,
  first,
  Observable,
  skip,
  Subject,
  takeUntil,
} from 'rxjs';
import { Player } from '../../classes/player';
import { MatDialog } from '@angular/material/dialog';
import { InitGameByNameComponent } from '../../modals/init-game-by-name/init-game-by-name.component';
import { AddPlayerComponent } from '../../modals/add-player/add-player.component';
import { GameLifecycleService } from '../../services/game-lifecycle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPlayerComponent } from '../../modals/edit-player/edit-player.component';
import { RemovePlayerComponent } from '../../modals/remove-player/remove-player.component';
import { QueuePlayer } from '../../classes/queue-player';
import { ConfigComponent } from '../../modals/config/config.component';
import { Store } from '@ngrx/store';
import {
  selectCurrentGameName,
  selectIsGameExist,
  selectPlayers,
} from '../../store/selectors';
import {
  DrinkGameActions,
  SetCurrentGame,
} from '../../store/drink-game.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  public players$: Observable<Player[]> = new Observable();
  public currentGameName$: Observable<string> = new Observable();
  public isCurrentGameExist$: Observable<boolean> = new Observable();
  // @ts-ignore
  queuePlayers$: BehaviorSubject<QueuePlayer[]> = new BehaviorSubject([]);
  destroy$: Subject<boolean> = new Subject();

  constructor(
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private gameLifecycleService: GameLifecycleService,
    private _snackBar: MatSnackBar,
    private _store: Store
  ) {}

  public ngOnInit(): void {
    this._store.dispatch({ type: DrinkGameActions.LoadDataFromLs });
    this.currentGameName$ = this._store.select(selectCurrentGameName);
    this.isCurrentGameExist$ = this._store.select(selectIsGameExist);
    this.players$ = this._store.select(selectPlayers);
    this._setGameNameOnInit();
    this.setQueue();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  public addPlayerOpenModal() {
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      width: '80%',
      minWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result && result?.nick == undefined) {
        return;
      }
      this._store.dispatch({
        type: DrinkGameActions.CreateMember,
        payload: { nick: result.nick, imgUrl: result?.imgUrl },
      });
    });
  }

  private _setGameNameOnInit(): void {
    const snapshotUrl = this._route.snapshot.url;
    this._store.dispatch({
      type: DrinkGameActions.SetCurrentGame,
      payload: { name: snapshotUrl[snapshotUrl.length - 1].path },
    });
  }

  handleEmitModifyUser(event: Player, i: number) {
    //   this.gameLifecycleService.modifyUser(event, i, this._currentGameName.value);
  }

  handleOpenEditPlayerModal(i: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
      width: '500px',
      //data: this.players$.value[i],
    });

    dialogRef.afterClosed().subscribe((data: Player) => {
      if (data) {
        // this.gameLifecycleService.modifyUser(
        //   data,
        //   i,
        //   this._currentGameName.value
        // );
        //    this.setPlayers();
      }
    });
  }

  removePlayerOnModal() {
    const dialogRef = this.dialog.open(RemovePlayerComponent, {
      width: '500px',
      //data: this.players$.value,
    });

    dialogRef.afterClosed().subscribe((data: Player[]) => {
      if (!data) {
        return;
      }
      // this.gameLifecycleService.repleceMembersArray(
      //   data,
      //   this._currentGameName.value
      // );
      // this.setPlayers();
    });
  }

  handleGenereteNewQueue() {
    // this.gameLifecycleService.genereteNewQueue(this._currentGameName.value);
    // this.setQueue();
  }
  setQueue() {
    //this.queuePlayers$.next(
    //  this.gameLifecycleService.getQueuePlayers(this._currentGameName.value)
    // );
  }

  openConfigModal() {
    const dialogRef = this.dialog.open(ConfigComponent);
  }
}
