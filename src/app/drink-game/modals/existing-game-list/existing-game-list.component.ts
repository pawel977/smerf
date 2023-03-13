import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-existing-game-list',
  templateUrl: './existing-game-list.component.html',
  styleUrls: ['./existing-game-list.component.scss'],
})
export class ExistingGameListComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ExistingGameListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {}

  ngOnInit(): void {
    console.log({ data: this.data });
  }

  onclick(item: string) {
    this.dialogRef.close(item);
  }
}
