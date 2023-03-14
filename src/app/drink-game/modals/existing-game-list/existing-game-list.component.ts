import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectGamesListNames } from '../../store/selectors';
@Component({
  selector: 'app-existing-game-list',
  templateUrl: './existing-game-list.component.html',
  styleUrls: ['./existing-game-list.component.scss'],
})
export class ExistingGameListComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ExistingGameListComponent>,
    private _store: Store
  ) {}

  ngOnInit(): void {}

  public getList$() {
    // @ts-ignore
    return this._store.select(selectGamesListNames);
  }

  onclick(item: string) {
    this.dialogRef.close(item);
  }
}
