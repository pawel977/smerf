import { Component, OnInit } from '@angular/core';
import { InitGameByNameComponent } from '../modals/init-game-by-name/init-game-by-name.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
})
export class DrinkComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  public createNewGame() {
    const dialogRef = this.dialog.open(InitGameByNameComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log({ result });
      if (result) {
      }
    });
  }
}
