import { Player } from './player';
import { QueuePlayer } from './queue-player';
import { Config } from './config';

export class Game {
  gameName: string = '';
  membersOfGame: Player[] = [];
  queuePlayers: QueuePlayer[] = [];
  //@ts-ignore
  config: Config;

  constructor(params: Partial<Game>) {
    Object.assign(this, params);
  }

  public setMembersOfGame(players: Player[]) {
    this.membersOfGame = players;
  }

  public get MembersOfGame(): Player[] {
    return this.membersOfGame;
  }
}
