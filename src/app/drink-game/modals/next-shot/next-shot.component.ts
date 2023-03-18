import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { B } from '@angular/cdk/keycodes';
import { MatDialogRef } from '@angular/material/dialog';

export enum steps {
  CZYNALANE,
  CZYNAPITE,
}
@Component({
  selector: 'app-next-shot',
  templateUrl: './next-shot.component.html',
  styleUrls: ['./next-shot.component.scss'],
})
export class NextShotComponent {
  public steps: typeof steps = steps;
  public status$: BehaviorSubject<steps> = new BehaviorSubject<steps>(
    steps.CZYNALANE
  );
  public isSubmitAlloved = false;
  constructor(public dialogRef: MatDialogRef<string>) {}

  nextStep(status: steps) {
    this.status$.next(status);
    setTimeout(() => {
      this.isSubmitAlloved = true;
    }, 300);
  }

  close() {
    this.dialogRef.close(true);
  }
}
