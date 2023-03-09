import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Player } from '../../classes/player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditImageLinkComponent } from '../edit-image-link/edit-image-link.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent {
  public form: FormGroup = this.getForm();
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Player,
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    private fb: FormBuilder
  ) {}

  public getForm(): FormGroup {
    return this.fb.group({
      nick: [this.data.getNick(), [Validators.required]],
      imgUrl: this.data.getImg(),
      wypiteKieliszki: [
        this.data.getWypiteKieliszki(),
        Validators.pattern('^[0-9]*$'),
      ],
      polaneKieliszki: [
        this.data.getPolaneKieliszki(),
        [Validators.pattern('^[0-9]*$')],
      ],
    });
  }

  openEditImgModal() {
    const dialogRef = this.dialog.open(EditImageLinkComponent, {
      width: '500px',
      data: this.form.get('imgUrl')?.value,
    });

    dialogRef.afterClosed().subscribe((data: string) => {
      if (data) {
        this.form.get('imgUrl')?.setValue(data);
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  closeAfterEditModal() {
    this.dialogRef.close(new Player(this.form.value));
  }
}
