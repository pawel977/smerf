import { Component, Input, OnInit } from '@angular/core';
import { QueuePlayer } from '../../classes/queue-player';

@Component({
  selector: 'app-queue-player-item',
  templateUrl: './queue-player-item.component.html',
  styleUrls: ['./queue-player-item.component.scss'],
})
export class QueuePlayerItemComponent implements OnInit {
  @Input()
  player: QueuePlayer | any;
  constructor() {}

  ngOnInit(): void {}
}
