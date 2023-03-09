export class QueuePlayer {
  nick: string = '';
  imageUrl: string = '';

  constructor(params: Partial<QueuePlayer>) {
    Object.assign(this, params);
  }

  getNick() {
    return this.nick;
  }
}
