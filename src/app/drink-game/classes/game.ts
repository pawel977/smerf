import { Player } from './player';
import { QueuePlayer } from './queue-player';

export class Game {
  gameName: string;
  membersOfGame: Player[] = [];
  queuePlayers: QueuePlayer[] = [];
  //@ts-ignore
  config;

  constructor(name: string) {
    this.gameName = name;
  }

  public setMembersOfGame(players: Player[]) {
    this.membersOfGame = players;
  }

  public get MembersOfGame(): Player[] {
    return this.membersOfGame;
  }
}
