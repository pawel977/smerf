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
    if (!data || data?.length < 1) {
      return [];
    }
    const res = JSON.parse(data);
    return res.map((item: any) => {
      return new Game(item);
    });
  }

  public getCurrentGameObject(gameNameString: string): {
    game: Object;
    index: number;
  } {
    const data = this.getData();
    const index = data.findIndex(
      (item: any) => item.gameName === gameNameString
    );
    return { game: <Object>data[index], index };
  }

  public createNewPlayer(data: any): Player {
    const { nick, imgUrl } = data;
    const newPlayer = new Player({ nick, imgUrl });
    if (imgUrl.length > 0) {
      newPlayer.setImg(imgUrl);
    }
    return newPlayer;
  }

  modifyUser(event: Player, i: number, gameName: string) {
    const currentGameObjAndIndex: { game: any; index: number } =
      this.getCurrentGameObject(gameName);
    const players: Player[] = currentGameObjAndIndex.game.membersOfGame;
    const data = this.getData();

    players[i] = event;
    data[currentGameObjAndIndex.index].membersOfGame = players;

    this._localStoradgeService.saveData(this._key, JSON.stringify(data));
  }

  genereteNewQueue(gameName: string) {
    const data = this.getData();
    const currentGameObjAndIndex: { game: any; index: number } =
      this.getCurrentGameObject(gameName);

    const queuePlayers: QueuePlayer[] =
      currentGameObjAndIndex.game.membersOfGame.map(
        (item: Player) => new QueuePlayer(item)
      );
    queuePlayers.push(...queuePlayers);
    queuePlayers.push(...queuePlayers);
    data[currentGameObjAndIndex.index].queuePlayers = queuePlayers;
    this._localStoradgeService.saveData(this._key, JSON.stringify(data));
  }

  getQueuePlayers(gameName: string) {
    const currentGameObjAndIndex: { game: any; index: number } =
      this.getCurrentGameObject(gameName);
    return !!currentGameObjAndIndex.game?.queuePlayers
      ? currentGameObjAndIndex.game.queuePlayers.map(
          (item: any) => new QueuePlayer(item)
        )
      : [];
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
