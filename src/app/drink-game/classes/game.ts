import { Player } from './player';

export class Game {
  private gameName: string;
  private membersOfGame: Player[] = [];

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
