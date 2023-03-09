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
    const valueCheckbox = event.checked;
    playerData.setCzyWciazPije(valueCheckbox);
    this.emitModifyUser.emit(playerData);
  }

  editPlayer() {
    this.emitOpenEmitWholePlayerModal.emit();
  }
}
