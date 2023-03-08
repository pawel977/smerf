import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Player } from '../../classes/player';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input()
  playerData: Player | undefined;
  constructor() {}

  ngOnInit(): void {}
}
