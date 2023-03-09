import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../classes/player';
import { BehaviorSubject } from 'rxjs';
import { RemoveSteps } from '../../models/remove-steps';

@Component({
  selector: 'app-remove-player',
  templateUrl: './remove-player.component.html',
  styleUrls: ['./remove-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RemovePlayerComponent {
  public enumRemoveSteps: typeof RemoveSteps = RemoveSteps;
  public removeSteps$: BehaviorSubject<RemoveSteps> =
    new BehaviorSubject<RemoveSteps>(RemoveSteps.CHOSE_PLAYER_RO_REMOVE);
  public chosenPlayer: any;
  indexToRemove: any;
  constructor(
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: Player[]
  ) {}

  next(player: Player, index: number) {
    this.removeSteps$.next(RemoveSteps.ACCEPT_VIEW);
    this.indexToRemove = index;
    this.chosenPlayer = player;
  }

  abort() {
    this.dialogRef.close();
  }

  sendReplaceData() {
    const dataCopy = this.data;
    dataCopy.splice(this.indexToRemove, 1);
    this.dialogRef.close(dataCopy);
  }
}
