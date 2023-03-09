import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QueuePlayer } from '../../classes/queue-player';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.scss'],
})
export class QueueListComponent implements OnInit {
  @Input()
  public queuePlayers$: any;
  @Output()
  public generateQueue: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
