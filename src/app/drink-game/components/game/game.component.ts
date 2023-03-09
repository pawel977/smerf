import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { Player } from '../../classes/player';
import { MatDialog } from '@angular/material/dialog';
import { InitGameByNameComponent } from '../../modals/init-game-by-name/init-game-by-name.component';
import { AddPlayerComponent } from '../../modals/add-player/add-player.component';
import { GameLifecycleService } from '../../services/game-lifecycle.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private gameLifecycleService: GameLifecycleService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this._setGameNameOnInit();
    this.setPlayers();
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
    console.log({ event, i });
    this.gameLifecycleService.modifyUser(event, i, this._currentGameName.value);
  }
}
