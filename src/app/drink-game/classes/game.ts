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
    Object.assign(this, {
      ...params,
      membersOfGame: this.getMappedMembers(params.membersOfGame),
      queuePlayers: this.getMappedQueueMembers(params.queuePlayers),
    });
  }

  public setMembersOfGame(players: Player[]) {
    this.membersOfGame = players;
  }

  public getMembersOfGame(): Player[] {
    return this.membersOfGame;
  }

  private getMappedMembers(membersOfGame: Player[] = []): Player[] {
    return membersOfGame.map((player: Player) => new Player(player));
  }
  private getMappedQueueMembers(membersOfQueue: QueuePlayer[] = []) {
    return membersOfQueue.map((player: QueuePlayer) => new QueuePlayer(player));
  }
}
