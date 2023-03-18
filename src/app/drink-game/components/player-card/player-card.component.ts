import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../classes/player';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent {
  @Input()
  playerData: Player | undefined;
  @Output()
  emitModifyUser: EventEmitter<Player> = new EventEmitter<Player>();
  @Output()
  emitOpenEmitWholePlayerModal: EventEmitter<Player> =
    new EventEmitter<Player>();
  constructor() {}

  onChangeIsDrinkingActive(event: any, playerData: Player): void {
    let copyPlayer = new Player(playerData);
    const valueCheckbox = event.checked;
    copyPlayer.setCzyWciazPije(valueCheckbox);
    this.emitModifyUser.emit(copyPlayer);
  }

  editPlayer() {
    this.emitOpenEmitWholePlayerModal.emit();
  }
}
