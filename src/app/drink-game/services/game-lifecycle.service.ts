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
    console.log({ res });
    if (!this.gameWithThisNameNotCreated(gameNameString)) {
      console.log(this.gameWithThisNameNotCreated(gameNameString));
      return;
    }
    const player: Player = this.createNewPlayer(data);
    const currentGameObj = this.getCurrentGameObject(res, gameNameString);
    console.log(currentGameObj);
  }

  public getCurrentGameObject(
    data: any,
    gameNameString: string
  ): { game: Object; index: number } {
    console.log(1);
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
    console.log({ data, name });
    return <boolean>(data.findIndex((e: any) => e.gameName === name) !== -1);
  }

  public str2obj(str: string) {
    return str
      .split(',')
      .map(keyVal => {
        return keyVal.split(':').map(_ => _.trim());
      })
      .reduce((accumulator: any, currentValue) => {
        accumulator[currentValue[0]] = currentValue[1];
        return accumulator;
      }, {});
  }
}
