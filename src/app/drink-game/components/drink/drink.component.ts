import { Component, OnInit } from '@angular/core';
import { InitGameByNameComponent } from '../../modals/init-game-by-name/init-game-by-name.component';
import { MatDialog } from '@angular/material/dialog';
import { GameLifecycleService } from '../../services/game-lifecycle.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  public createNewGame() {
    const dialogRef = this.dialog.open(InitGameByNameComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.gameLifecycleService.createGameByTitleAndSetToLs(result);
        this.router.navigate([`game/${result}`], { relativeTo: this.route });
      }
    });
  }
}
