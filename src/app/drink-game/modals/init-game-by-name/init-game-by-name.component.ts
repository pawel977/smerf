import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-init-game-by-name',
  templateUrl: './init-game-by-name.component.html',
  styleUrls: ['./init-game-by-name.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InitGameByNameComponent implements OnInit {
  public gameName: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32),
  ]);
  constructor(
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  public submit() {
    this.dialogRef.close(this.gameName.value);
  }
  public abort() {
    this.dialogRef.close();
  }
}
