import { Injectable } from '@angular/core';
import { LocalStoradgeService } from '../../shared/services/local-storadge.service';
import { Game } from '../classes/game';
import { Player } from '../classes/player';

@Injectable({
  providedIn: 'root',
})
export class GameLifecycleService {
  private _key: string = 'DRINK_GAME_KEY';
  constructor(private _localStoradgeService: LocalStoradgeService) {}
  public getData() {
    const data = this._localStoradgeService.getData(this._key);
    if (!data || data?.length < 1) {
      return [];
    }
    return JSON.parse(data);
  }
  public createGameByTitleAndSetToLs(gameName: string): void {
    const data = this.getData();
    // @ts-ignore
    if (this.validateIsExistingAnyGame()) {
      this.validateWhenDataIsExistingGame(data, gameName);
    } else {
      const res: string = JSON.stringify([new Game(gameName)]);
      this._localStoradgeService.saveData(this._key, res);
    }
  }

  private validateWhenDataIsExistingGame(data: any[], name: string) {
    const index = data.findIndex((e: any) => e.gameName === name);
    const res = data;
    if (index !== -1) {
      res[index] = new Game(name);
    } else {
      res.push(new Game(name));
    }
    const jsonRes = JSON.stringify(res);
    this._localStoradgeService.saveData(this._key, jsonRes);
  }
  private validateIsExistingAnyGame(): boolean {
    const data = this.getData();
    return data.length > 0;
  }

  public createAndAddToExistingGame(data: any, gameNameString: string): void {
    const res = this.getData();

    const player: Player = this.createNewPlayer(data);
    const currentGameObj: any = this.getCurrentGameObject(res, gameNameString);
    const existingPlayers: Player[] = currentGameObj.game.membersOfGame;
    const indexIfExisting = existingPlayers.findIndex(
      (e: any) => e.nick === player.getNick()
    );

    console.log({ res });
    if (this.gameWithThisNameNotCreated(gameNameString)) {
      const resFullData = res[currentGameObj.index];
      resFullData.membersOfGame.push(player);
      debugger;
      this._localStoradgeService.saveData(
        this._key,
        JSON.stringify(resFullData)
      );
    }

    console.log({ indexIfExisting });
    if (indexIfExisting !== -1) {
      //err
      console.error('exist');
      return;
    } else {
      console.log({
        jaDupia: res[currentGameObj.index],
        currentGameObj,
        res,
      });
      const resFullData = res[currentGameObj.index];
      resFullData.membersOfGame.push(player);

      const xd = res;
      xd[currentGameObj.index] = resFullData;
      this._localStoradgeService.saveData(this._key, JSON.stringify(xd));
    }
    console.log(currentGameObj);
  }

  public getCurrentGameObject(
    data: any,
    gameNameString: string
  ): { game: Object; index: number } {
    console.log('getCurrentGameObject', { data });
    const index = data.findIndex(
      (item: any) => item.gameName === gameNameString
    );
    console.log(index);
    return { game: <Object>data[index], index };
  }

  public createNewPlayer(data: any): Player {
    const { nick, imgUrl } = data;
    const newPlayer = new Player(nick);
    if (imgUrl) {
      newPlayer.setImg(imgUrl);
    }
    return newPlayer;
  }

  public gameWithThisNameNotCreated(name: string): boolean {
    const data = this.getData();
    console.log({
      data,
      name,
      xd: data.findIndex((e: any) => e.gameName === name),
    });
    return <boolean>(data.findIndex((e: any) => e.gameName === name) === -1);
  }
}
