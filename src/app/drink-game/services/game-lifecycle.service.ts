import { Injectable } from '@angular/core';
import { LocalStoradgeService } from '../../shared/services/local-storadge.service';
import { Game } from '../classes/game';
import { Player } from '../classes/player';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueuePlayer } from '../classes/queue-player';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { DrinkGameActions, SetCurrentGame } from '../store/drink-game.actions';

@Injectable({
  providedIn: 'root',
})
export class GameLifecycleService {
  private _key: string = 'DRINK_GAME_KEY';
  constructor(
    private _localStoradgeService: LocalStoradgeService,
    private _snackBar: MatSnackBar,
    private _store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public getData(): Game[] {
    const data = this._localStoradgeService.getData(this._key);
    let gamesArray: Game[] = [];
    if (!data || data?.length < 1) {
      return [];
    }

    const res = JSON.parse(data);
    res.forEach((item: any) => {
      gamesArray.push(new Game(item));
    });

    return gamesArray;
  }

  public createNewPlayer(data: Partial<Player>): Player {
    return new Player(data);
  }

  genereteNewQueue(players: Player[] = []): QueuePlayer[] {
    const arrayOfQueuePlayers = [];
    const mapOfPlayers = players.map(item => new QueuePlayer(item));

    for (let i = 0; i < 7; i++) {
      const index = Math.floor(Math.random() * mapOfPlayers.length);
      arrayOfQueuePlayers.push(mapOfPlayers[index]);
    }
    return arrayOfQueuePlayers;
  }

  getSplitetdQueueByFirst(queue: QueuePlayer[] = []): QueuePlayer[] {
    if (queue.length < 1) {
      return [];
    }
    const copyTab = queue.slice();
    copyTab.splice(0, 1);
    return copyTab;
  }

  createNewGame(gameName: string, gamesList: Game[]): Game[] {
    const payload = gamesList.slice();
    payload.push(new Game({ gameName }));
    return payload;
  }

  setDataToLs(data: any) {
    const jsonRes = JSON.stringify(data);
    this._localStoradgeService.saveData(this._key, jsonRes);
  }
}
