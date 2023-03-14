import { Injectable } from '@angular/core';
import { LocalStoradgeService } from '../../shared/services/local-storadge.service';
import { Game } from '../classes/game';
import { Player } from '../classes/player';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueuePlayer } from '../classes/queue-player';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SetCurrentGame } from '../store/drink-game.actions';

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
  public createGameByTitleAndSetToLs(gameName: string, route: string): void {
    const data: Game[] = this.getData();
    // @ts-ignore
    if (this.validateIsExistingAnyGame()) {
      this.validateWhenDataIsExistingGame(data, gameName, route);
    } else {
      const res: string = JSON.stringify([new Game({ gameName })]);
      this._localStoradgeService.saveData(this._key, res);
      this.router.navigate([route], { relativeTo: this.route });
    }
  }

  private validateWhenDataIsExistingGame(
    data: Game[],
    gameName: string,
    route: string
  ) {
    const index: number = data.findIndex((e: any) => e.gameName === gameName);
    const res = data;
    if (index !== -1) {
      this._snackBar.open('Gra o tej nazwie juz istnieje', 'OK', {
        duration: 3000,
      });
      return;
    } else {
      res.push(new Game({ gameName }));
    }
    const jsonRes = JSON.stringify(res);
    this._localStoradgeService.saveData(this._key, jsonRes);
    this.router.navigate([route], { relativeTo: this.route });
  }
  private validateIsExistingAnyGame(): boolean {
    const data = this.getData();
    return data.length > 0;
  }

  public createAndAddToExistingGame(
    data: Partial<Player>,
    gameNameString: string
  ): void {
    const res = this.getData();

    const player: Player = this.createNewPlayer(data);
    const currentGameObj: any = this.getCurrentGameObject(gameNameString);
    const existingPlayers: Player[] = currentGameObj.game.membersOfGame;
    const indexIfExisting = existingPlayers.findIndex(
      (e: any) => e.nick === player.getNick()
    );

    if (this.gameWithThisNameNotCreated(gameNameString)) {
      const resFullData = res[currentGameObj.index];
      resFullData.membersOfGame.push(player);
      debugger;
      this._localStoradgeService.saveData(
        this._key,
        JSON.stringify(resFullData)
      );
    }

    if (indexIfExisting !== -1) {
      this._snackBar.open('Gracz o tej nazwie juz istnieje', 'OK', {
        duration: 3000,
      });
      return;
    } else {
      const resFullData = res[currentGameObj.index];
      resFullData.membersOfGame.push(player);

      const xd = res;
      xd[currentGameObj.index] = resFullData;
      this._localStoradgeService.saveData(this._key, JSON.stringify(xd));
    }
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
    if (imgUrl) {
      newPlayer.setImg(imgUrl);
    }
    return newPlayer;
  }

  public gameWithThisNameNotCreated(name: string): boolean {
    const data = this.getData();
    return <boolean>(data.findIndex((e: any) => e.gameName === name) === -1);
  }

  getUsersForCurrentGame(currentGameName: string): Player[] {
    const onbject: { game: any; index: number } =
      this.getCurrentGameObject(currentGameName);
    const players: Player[] = onbject.game.membersOfGame.map(
      (data: any) => new Player(data)
    );
    return players;
  }

  isCurrentGameExist(gameName: string): boolean {
    const data: Game[] = this.getData();
    console.log({
      data,
      gameName,
      xd:
        data.findIndex((gameObj: Game) => gameObj.gameName === gameName) !== -1,
    });
    return (
      data.findIndex((gameObj: Game) => gameObj.gameName === gameName) !== -1
    );
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

  repleceMembersArray(data: Player[], gameName: string) {
    const currentGameObjAndIndex: { game: any; index: number } =
      this.getCurrentGameObject(gameName);
    const response = this.getData();

    response[currentGameObjAndIndex.index].membersOfGame = data;
    this._localStoradgeService.saveData(this._key, JSON.stringify(response));
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
}
