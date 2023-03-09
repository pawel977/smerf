import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
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

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public players$: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>(
    []
  );
  private _currentGameName: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  // @ts-ignore
  queuePlayers$: BehaviorSubject<QueuePlayer[]> = new BehaviorSubject([]);

  constructor(
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private gameLifecycleService: GameLifecycleService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this._setGameNameOnInit();
    this.setPlayers();
    this.setQueue();
  }

  public setPlayers(): void {
    if (!this.isGameExistingWithThisName()) {
      this._snackBar.open('Podana gra nie istnieje', 'zamknij', {
        duration: 3000,
      });
      return;
    }
    this.players$.next(
      this.gameLifecycleService.getUsersForCurrentGame(
        this._currentGameName.value
      )
    );
  }

  public getCurrentGameName(): BehaviorSubject<string> {
    return this._currentGameName;
  }

  public isGameExistingWithThisName(): boolean {
    return this.gameLifecycleService.isCurrentGameExist(
      this._currentGameName.value
    );
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
      this.gameLifecycleService.createAndAddToExistingGame(
        { nick: result.nick, imgUrl: result?.imgUrl },
        this._currentGameName.value
      );
      this.setPlayers();
    });
  }

  private _setGameNameOnInit(): void {
    const snapshotUrl = this._route.snapshot.url;
    this._currentGameName.next(snapshotUrl[snapshotUrl.length - 1].path);
  }

  handleEmitModifyUser(event: Player, i: number) {
    this.gameLifecycleService.modifyUser(event, i, this._currentGameName.value);
  }

  handleOpenEditPlayerModal(i: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
      width: '500px',
      data: this.players$.value[i],
    });

    dialogRef.afterClosed().subscribe((data: Player) => {
      if (data) {
        this.gameLifecycleService.modifyUser(
          data,
          i,
          this._currentGameName.value
        );
        this.setPlayers();
      }
    });
  }

  removePlayerOnModal() {
    const dialogRef = this.dialog.open(RemovePlayerComponent, {
      width: '500px',
      data: this.players$.value,
    });

    dialogRef.afterClosed().subscribe((data: Player[]) => {
      if (!data) {
        return;
      }
      this.gameLifecycleService.repleceMembersArray(
        data,
        this._currentGameName.value
      );
      this.setPlayers();
    });
  }

  handleGenereteNewQueue() {
    this.gameLifecycleService.genereteNewQueue(this._currentGameName.value);
    this.setQueue();
  }
  setQueue() {
    this.queuePlayers$.next(
      this.gameLifecycleService.getQueuePlayers(this._currentGameName.value)
    );
  }

  openConfigModal() {
    const dialogRef = this.dialog.open(ConfigComponent);
  }
}
