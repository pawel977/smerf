import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, of, startWith } from 'rxjs';
import { QueuePlayer } from '../../classes/queue-player';
import { Store } from '@ngrx/store';
import { selectQueuePlayers } from '../../store/selectors';
import { AddPlayerComponent } from '../../modals/add-player/add-player.component';
import { DrinkGameActions } from '../../store/drink-game.actions';
import { MatDialog } from '@angular/material/dialog';
import { NextShotComponent } from '../../modals/next-shot/next-shot.component';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.scss'],
})
export class QueueListComponent implements OnInit {
  public queuePlayers$: Observable<any[]> = of([]);

  constructor(private _store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.queuePlayers$ = this._store.select(selectQueuePlayers);
  }

  public isListAvailavle$(): Observable<boolean> {
    return this.queuePlayers$.pipe(
      startWith([]),
      map(e => e.length > 0)
    );
  }

  nextShot() {
    const dialogRef = this.dialog.open(NextShotComponent, {
      width: '80%',
      minWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) {
        return;
      }
      this._store.dispatch({
        type: DrinkGameActions.StartNextShot,
      });
    });
  }
}
